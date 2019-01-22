#! /usr/bin/env node
'use strict'

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

/**
 * library specific deps
 */
const pkg = require('./package.json')
const { socket, closeServer } = require('./lib/socket.js')
const reloadBanner = require('./lib/reloadBanner.js')
const {
  log,
  join,
  resolve,
  exists,
  match
} = require('./lib/util.js')

const prog = require('commander')
  .option('-w, --watch', 'watch for changes and deploy edited files')
  .option('-c, --config <path>', 'specify a path to a slater config file')
  .option('-d, --deploy <theme>', 'deploy a named theme from your config.yml file')
  .parse(process.argv)

/**
 * get config files
 */
const gitignore = exists('.gitignore', path => fs.readFileSync(path, 'utf8'))
const slaterconfig = exists(prog.config || 'slater.config.js', path => require(path), true)
const themeconfig = yaml.parse(exists('src/config.yml', path => (
  fs.readFileSync(path, 'utf8')
), true))[prog.deploy || 'development']

/**
 * exit if the theme info isn't configured
 */
if (!themeconfig) {
  log(c => ([
    c.red('error'),
    `${prog.deploy} theme configuration does not exist`
  ]))
  exit()
}

/**
 * combine ignored files
 */
const ignored = ['**/scripts/**', '**/styles/**', 'DS_Store']
  .concat(themeconfig.ignore_files || [])
  .concat(gitignore ? require('parse-gitignore')(gitignore) : [])

/**
 * our "themekit"
 */
const theme = sync({
  password: themeconfig.password,
  store: themeconfig.store,
  theme_id: themeconfig.theme_id,
  ignore_files: ignored
})

/**
 * deep merge user config with defaults
 */
const config = merge({
  in: '/src/scripts/index.js',
  outDir:'/build/assets',
  watch: prog.watch,
  map: prog.watch ? 'inline-cheap-source-map' : false,
  alias: {
    scripts: resolve('/src/scripts'),
    styles: resolve('/src/styles')
  },
  banner: prog.watch ? reloadBanner : false
}, slaterconfig)

/**
 * overwrite paths to ensure they point to the cwd()
 */
config.in = join(config.in)
config.outDir = join(config.outDir)
config.filename = config.filename || path.basename(config.in, '.js')

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

function logAssets ({ duration, assets }) {
  log(c => `${c.green(`built assets`)} in ${duration}ms\n${assets.reduce((_, asset, i) => {
    const size = asset.size.gzip ? asset.size.gzip + 'kb gzipped' : asset.size.raw + 'kb'
    return _ += `  > ${c.green(asset.filename)} ${size}${i !== assets.length - 1 ? `\n` : ''}`
  }, '')}`)
}

/**
 * go go go
 */
fs.copy(join('src'), join('build'), {
  filter (src, dest) {
    return !match(src, ignored)
  }
}).then(() => {
  if (prog.watch) {
    log(c => c.green('watching'))

    const watchers = [
      chokidar.watch(join('/src'), {
        persistent: true,
        ignoreInitial: true,
        ignore: ignored
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

    spaghetti(config)
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

    return
  }

  log(c => c.green('building'))

  spaghetti(config)
    .build()
    .end(stats => {
      logAssets(stats)

      if (prog.deploy) {
        log(c => c.green('deploying'))

        theme.sync([ join('/build') ], (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          write(`uploading ${complete} of ${total} files (${percent}%)`)
        })
          .then(() => {
            log(c => ([
              c.green(`deployed to ${prog.deploy} theme`)
            ]))
            exit()
          })
          .catch(e => {
            log(c => ([
              c.red('deploy failed'), e
            ]))
            exit()
          })
      } else {
        exit()
      }
    })
    .error(err => {
      log(c => ([
        c.red(`error`),
        err ? err.message || err : ''
      ]))
    })
})
.catch(e => {
  log(c => ([
    c.red('initial theme copy failed'),
    e.message || e
  ]))
})
