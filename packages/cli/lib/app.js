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
  match
} = require('@slater/util')

/**
 * library specific deps
 */
const { socket, closeServer } = require('./socket.js')
const getSpaghettiConfig = require('./getSpaghettiConfig.js')


const log = logger('@slater/cli')

/**
 * utilities
 */
function copyFile (p) {
  const pathname = p.split('/src')[1]

  return fs.copy(p, join('/build', pathname))
    .catch(e => {
      log.error(`copying ${pathname} failed\n${e.message || e}`)
    })
}

function deleteFile (p) {
  const pathname = p.split('/src')[1]

  return fs.remove(join('/build', pathname))
    .catch(e => {
      log.error(`deleting ${pathname} failed\n${e.message || e}`)
    })
}

function logAssets ({ duration, assets }, persist) {
  log.info('built', ` in ${duration}ms\n${assets.reduce((_, asset, i) => {
    const size = asset.size.gzip ? asset.size.gzip + 'kb gzipped' : asset.size.raw + 'kb'
    return _ += `  > ${log.colors.gray(asset.filename)} ${size}${i !== assets.length - 1 ? `\n` : ''}`
  }, '')}`, persist)
}


module.exports = function createApp (options) {
  const spaghetticonfig = getSpaghettiConfig(options)
  const theme = sync(options)

  function syncFile (p) {
    if (!p) return Promise.resolve(true)

    const pathname = p.split('/build')[1]

    return theme.sync(p)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log.info('synced', pathname)
      })
      .catch(e => {
        log.error(`syncing ${pathname} failed\n${e.message || e || ''}`)
      })
  }

  function unsyncFile (p) {
    if (!p) return Promise.resolve(true)

    const pathname = p.split('/build')[1]

    return theme.unsync(p)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log.info('unsynced', pathname)
      })
      .catch(e => {
        log.error(`unsyncing ${pathname} failed\n${e.message || e || ''}`)
      })
  }

  return {
    watch () {
      log.info('watching')

      const watchers = [
        chokidar.watch(join('/src'), {
          persistent: true,
          ignoreInitial: true,
          ignore: theme.config.ignored_files
        })
          .on('add', copyFile)
          .on('change', copyFile)
          .on('unlink', deleteFile),

        chokidar.watch(join('/build'), {
          ignore: /DS_Store/,
          persistent: true,
          ignoreInitial: true
        })
          .on('add', syncFile)
          .on('change', syncFile)
          .on('unlink', unsyncFile)
      ]

      spaghetti(spaghetticonfig)
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

      return spaghetti(spaghetticonfig)
        .build()
        .end(stats => {
          logAssets(stats, true)
          cb ? cb() : exit()
        })
        .error(e => {
          log.error(e.message || e || '')
        })
    },
    deploy () {
      log.info('syncing', '', true)

      return theme.sync([ join('/build') ], (total, rest) => {
        const complete = total - rest
        const percent = Math.ceil((complete / total) * 100)
        log.info('syncing', percent + '%', true)
      })
        .then(() => {
          log.info('deployed', `to ${options.theme} theme`, true)
          exit()
        })
        .catch(e => {
          log.error(`deploy failed\n${e.message || e || ''}`)
          exit()
        })
    }
  }
}
