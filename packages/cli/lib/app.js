const fs = require('fs-extra')
const path = require('path')
const onExit = require('exit-hook')
const exit = require('exit')
const chokidar = require('chokidar')
const merge = require('merge-deep')

/**
 * internal modules
 */
const spaghetti = require('@friendsof/spaghetti')
const sync = require('@slater/sync')
const {
  logger,
  join,
  resolve,
  exists,
  match,
  sanitize
} = require('@slater/util')

/**
 * library specific deps
 */
const { socket, closeServer } = require('./socket.js')
const getConfig = require('./getConfig.js')


const log = logger('@slater/cli')

/**
 * utilities
 */
function copyFile ({ filename, src, dest }) {
  return fs.copy(src, dest)
    .catch(e => {
      log.error(`copying ${filename} failed\n${e.message || e}`)
    })
}

function deleteFile ({ filename, src, dest }) {
  return fs.remove(dest)
    .catch(e => {
      log.error(`deleting ${filename} failed\n${e.message || e}`)
    })
}

function logAssets ({ duration, assets }, persist) {
  log.info('built', ` in ${duration}ms\n${assets.reduce((_, asset, i) => {
    const size = asset.size.gzip ? asset.size.gzip + 'kb gzipped' : asset.size.raw + 'kb'
    return _ += `  > ${log.colors.gray(asset.filename)} ${size}${i !== assets.length - 1 ? `\n` : ''}`
  }, '')}`, persist)
}

function formatFile (filepath, src, dest) {
  if (!filepath) return {}

  const filename = sanitize(filepath)

  return {
    filename,
    src: filepath,
    dest: path.join(dest, filename)
  }
}

module.exports = function createApp (config, theme) {
  function syncFile ({ filename, src, dest }) {
    if (!filename) return Promise.resolve(true)

    return theme.sync(dest)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log.info('synced', filename)
      })
      .catch(e => {
        log.error(`syncing ${filename} failed\n${e.message || e || ''}`)
      })
  }

  function unsyncFile ({ filename, src, dest }) {
    if (!filename) return Promise.resolve(true)

    return theme.unsync(dest)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log.info('unsynced', filename)
      })
      .catch(e => {
        log.error(`unsyncing ${filename} failed\n${e.message || e || ''}`)
      })
  }

  return {
    copy () {
      return new Promise((res, rej) => {
        fs.emptyDir(config.out)
          .then(() => {
            fs.copy(config.in, config.out, {
              filter (src, dest) {
                return !match(src, theme.config.ignore_files)
              }
            }).then(res).catch(rej)
          }).catch(rej)
      })
    },
    watch () {
      log.info('watching')

      const watchers = [
        chokidar.watch(config.in, {
          persistent: true,
          ignoreInitial: true,
          ignore: theme.config.ignore_files
        })
          .on('add', file => {
            // @see https://github.com/paulmillr/chokidar/issues/773
            if (match(file, theme.config.ignore_files)) return
            copyFile(formatFile(file, config.in, config.out))
          })
          .on('change', file => {
            if (match(file, theme.config.ignore_files)) return
            copyFile(formatFile(file, config.in, config.out))
          })
          .on('unlink', file => {
            if (match(file, theme.config.ignore_files)) return
            deleteFile(formatFile(file, config.in, config.out))
          }),

        chokidar.watch(config.out, {
          ignore: /DS_Store/,
          persistent: true,
          ignoreInitial: true
        })
          .on('add', file => syncFile(formatFile(file, config.in, config.out)))
          .on('change', file => syncFile(formatFile(file, config.in, config.out)))
          .on('unlink', file => unsyncFile(formatFile(file, config.in, config.out)))
      ]

      spaghetti(config.js)
        .watch()
        .end(stats => {
          logAssets(stats, false)
        })
        .error(e => {
          log.error(e.message || e || '')
        })

      onExit(() => watchers.map(w => w.close()))
    },
    build (cb) {
      log.info('building', '', true)

      return spaghetti(config.js)
        .build()
        .end(stats => {
          logAssets(stats, true)
          cb ? cb() : exit()
        })
        .error(e => {
          log.error(e.message || e || '')
        })
    }
  }
}
