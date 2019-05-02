const fs = require('fs-extra')
const path = require('path')
const onExit = require('exit-hook')
const exit = require('exit')
const chokidar = require('chokidar')
const webpack = require('webpack')
const link = require('terminal-link')

/**
 * internal modules
 */
const compiler = require('@slater/compiler')
const spaghetti = require('@friendsof/spaghetti')
const sync = require('@slater/sync')
const {
  logger,
  match,
  sanitize
} = require('@slater/util')

const log = logger('slater')

function logStats (stats, opts = {}) {
  log.info('built', `in ${stats.duration}s\n${stats.assets.reduce((_, asset, i) => {
    const size = opts.watch ? '' : asset.size + 'kb'
    return _ += `  > ${log.colors.gray(asset.name)} ${size}${i !== stats.assets.length - 1 ? `\n` : ''}`
  }, '')}`)
}

/**
 * input absolute filepath, return
 *   - its filename (as a Shopify "key")
 *   - where it's coming from
 *   - where it's going
 *
 *   e.g. "/Users/user/Sites/projects/my-project/src/snippets/snip.liquid"
 *
 *   {
 *     filename: "snippets/snip.liquid",
 *     src: "/Users/user/Sites/projects/my-project/src/snippets/snip.liquid",
 *     dest: "/Users/user/Sites/projects/my-project/build/snippets/snip.liquid"
*    }
 */
function formatFile (filepath, src, dest) {
  if (!filepath) return {}

  const filename = sanitize(filepath)

  return {
    filename,
    src: filepath,
    dest: path.join(dest, filename)
  }
}

module.exports = function createApp (config) {
  return {
    copy () {
      return new Promise((res, rej) => {
        fs.emptyDir(config.out)
          .then(() => {
            fs.copy(config.in, config.out, {
              filter (src, dest) {
                return !match(src, config.theme.ignore)
              }
            })
              .then(res)
              .catch(e => {
                log.error(e.message || e)
                rej(e)
                exit()
              })
          })
          .catch(e => {
            log.error(e.message || e)
            rej(e)
            exit()
          })
      })
    },
    build () {
      log.info(
        'build',
        link(
          `${config.theme.name} theme`,
          `https://${config.theme.store}/?fts=0&preview_theme_id=${config.theme.id}`
        )
      )
      console.log('')

      return new Promise((res, rej) => {
        const bundle = compiler(config.assets)

        bundle.on('error', e => {
          log.error(e)
          rej(e)
        })
        bundle.on('stats', stats => {
          logStats(stats)
          res(stats)
        })

        bundle.build()
      })
    },
    watch () {
      log.info(
        'watch',
        link(
          `${config.theme.name} theme`,
          `https://${config.theme.store}/?fts=0&preview_theme_id=${config.theme.id}`
        )
      )
      console.log('')

      let socket

      const theme = sync(config.theme)

      /**
       * utilities for watch task only
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
      function syncFile ({ filename, src, dest }) {
        if (!filename) return Promise.resolve(true)

        return theme.sync(dest)
          .then(() => socket.emit('refresh'))
          .then(() => {
            log.info('synced', filename)
          })
          .catch(({ errors, key }) => {
            log.error(`syncing ${key} failed - ${errors.asset ? errors.asset.join('  ') : errors}`)
          })
      }
      function unsyncFile ({ filename, src, dest }) {
        if (!filename) return Promise.resolve(true)

        return theme.unsync(dest)
          .then(() => socket.emit('refresh'))
          .then(() => {
            log.info('unsynced', filename)
          })
          .catch(({ errors, key }) => {
            log.error(`syncing ${key} failed - ${errors.asset ? errors.asset.join('  ') : errors}`)
          })
      }

      const watchers = [
        chokidar.watch(config.in, {
          persistent: true,
          ignoreInitial: true,
          ignore: config.theme.ignore
        })
          .on('add', file => {
            // @see https://github.com/paulmillr/chokidar/issues/773
            if (match(file, config.theme.ignore)) return
            copyFile(formatFile(file, config.in, config.out))
          })
          .on('change', file => {
            if (match(file, config.theme.ignore)) return
            copyFile(formatFile(file, config.in, config.out))
          })
          .on('unlink', file => {
            if (match(file, config.theme.ignore)) return
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

      const bundle = compiler(config.assets)

      bundle.on('error', e => {
        log.error(e)
      })
      bundle.on('stats', stats => {
        logStats(stats, { watch: true })
      })

      socket = bundle.watch()

      onExit(() => {
        watchers.map(w => w.close())
        bundle.close()
      })
    }
  }
}
