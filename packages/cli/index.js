#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const path = require('path')
const onExit = require('exit-hook')
const exit = require('exit')
const chokidar = require('chokidar')
const merge = require('merge-deep')
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
const ignored = ['**/scripts/**', '**/styles/**', /DS_Store/]
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

const bundle = spaghetti(config)

fs.copy(join('src'), join('build'), {
  filter (src, dest) {
    return !match(src, ignored)
  }
})
  .then(() => {
    log(c => ([ c.green('copied'), 'theme to build/']))

    if (prog.watch) {
      log('watching')
      return
    }

    log('building')

    bundle.build()
      .end(stats => {
        log(stats)
        log(c => ([
          c.green(`compiled`),
          `in ${stats.duration}ms`
        ]))
      })

    if (prog.deploy) {
      log('deploying')
      return
    }
  })
  .catch(e => {
    log(c => ([
      c.red('failed top copy theme'),
      e.message || e
    ]))
  })
