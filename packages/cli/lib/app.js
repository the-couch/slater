const fs = require('fs-extra')
const path = require('path')
const onExit = require('exit-hook')
const exit = require('exit')
const chokidar = require('chokidar')
const merge = require('merge-deep')
const write = require('log-update')
const yaml = require('yaml').default

/**
 * internal modules
 */
const spaghetti = require('@friendsof/spaghetti')
const sync = require('@slater/sync')
const {
  log,
  join,
  resolve,
  exists,
  match
} = require('@slater/util')

/**
 * library specific deps
 */
const { socket, closeServer } = require('./socket.js')
const getConfigs = require('./getConfigs.js')

/**
 * utilities
 */
function copyFile (p) {
  const pathname = p.split('/src')[1]

  return fs.copy(p, join('/build', pathname))
    .catch(e => {
      log(c => ([
        c.red(`error`),
        `copying ${pathname} failed`,
        e.message || e || ''
      ]))
    })
}

function deleteFile (p) {
  const pathname = p.split('/src')[1]

  return fs.remove(join('/build', pathname))
    .catch(e => {
      log(c => ([
        c.red(`error`),
        `deleting ${pathname} failed`,
        e.message || e || ''
      ]))
    })
}

function logAssets ({ duration, assets }) {
  log(c => `${c.green(`built assets`)} in ${duration}ms\n${assets.reduce((_, asset, i) => {
    const size = asset.size.gzip ? asset.size.gzip + 'kb gzipped' : asset.size.raw + 'kb'
    return _ += `  > ${c.green(asset.filename)} ${size}${i !== assets.length - 1 ? `\n` : ''}`
  }, '')}`)
}


module.exports = function createApp (options) {
  const { spaghetticonfig, themeconfig } = getConfigs(options)

  /**
   * our "themekit"
   */
  const theme = sync(themeconfig)

  function syncFile (p) {
    const pathname = p.split('/build')[1]

    return theme.sync(p)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log(c => ([
          c.blue(`synced`),
          pathname
        ]))
      })
      .catch(e => {
        log(c => ([
          c.red(`error`),
          `uploading ${pathname} failed`,
          e.message || e || ''
        ]))
      })
  }

  function unsyncFile (p) {
    const pathname = p.split('/build')[1]

    return theme.unsync(p)
      .then(() => socket.emit('refresh'))
      .then(() => {
        log(c => ([
          c.blue(`unsynced`),
          pathname
        ]))
      })
      .catch(e => {
        log(c => ([
          c.red(`error`),
          `unsyncing ${pathname} failed`,
          e.message || e || ''
        ]))
      })
  }

  return {
    watch () {
      log(c => c.green('watching'))

      const watchers = [
        chokidar.watch(join('/src'), {
          persistent: true,
          ignoreInitial: true,
          ignore: themeconfig.ignored_files
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
          logAssets(stats)
        })
        .error(err => {
          log(c => ([
            c.red(`error`),
            err ? err.message || err : ''
          ]))
        })

      onExit(() => watchers.map(w => w.close()))
    },
    build (cb) {
      log(c => c.green('building'))

      return spaghetti(spaghetticonfig)
        .build()
        .end(stats => {
          logAssets(stats)
          cb ? cb() : exit()
        })
        .error(err => {
          log(c => ([
            c.red(`error`),
            err ? err.message || err : ''
          ]))
        })
    },
    deploy () {
      log(c => c.green('deploying'))

      return theme.sync([ join('/build') ], (total, rest) => {
        const complete = total - rest
        const percent = Math.ceil((complete / total) * 100)
        write(`uploading ${complete} of ${total} files (${percent}%)`)
      })
        .then(() => {
          log(c => ([
            c.green(`deployed to ${options.env} theme`)
          ]))
          exit()
        })
        .catch(e => {
          log(c => ([
            c.red('deploy failed'), e
          ]))
          exit()
        })
    }
  }
}
