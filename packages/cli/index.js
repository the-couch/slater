#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const path = require('path')
const exit = require('exit')
const wait = require('w2t')
const download = require('download')
const extract = require('extract-zip')

const sync = require('@slater/sync')
const {
  logger,
  getShopifyConfig,
  getSlaterConfig
} = require('@slater/util')

const pkg = require('./package.json')
const createApp = require('./lib/app.js')

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <path>', 'specify a path to a config.yml file')
  .option('-t, --theme <name>', 'specify a named theme from your config.yml file')
  .option('-s, --slater <path>', 'specify a path to a slater config file')

const log = logger('@slater/cli')

prog
  .command('watch')
  .action(() => {
    const options = {
      watch: true,
      config: prog.config || 'config.yml',
      theme: prog.theme || 'development',
      slater: prog.slater || 'slater.config.js'
    }

    const slaterconfig = getSlaterConfig(options)
    const shopifyconfig = getShopifyConfig(options)

    const app = createApp(slaterconfig, shopifyconfig)

    app.copy().then(app.watch)
  })

prog
  .command('build')
  .action(() => {
    const options = {
      watch: true,
      config: prog.config || 'config.yml',
      theme: prog.theme || 'development',
      slater: prog.slater || 'slater.config.js'
    }

    const slaterconfig = getSlaterConfig(options)
    const shopifyconfig = getShopifyConfig(options)

    const app = createApp(slaterconfig, shopifyconfig)

    app.copy().then(app.build)
  })

prog
  .command('sync [paths...]')
  .action(paths => {
    const options = {
      config: prog.config || 'config.yml',
      theme: prog.theme || 'development',
      slater: prog.slater || 'slater.config.js'
    }

    const slaterconfig = getSlaterConfig(options)
    const shopifyconfig = getShopifyConfig(options)

    const theme = sync(shopifyconfig)

    paths = paths && paths.length ? paths : slaterconfig.out

    wait(1000, [
      theme
        .sync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          log.info('syncing', percent + '%', true)
        })
    ]).then(() => {
      log.info('sync', 'complete', true)
      exit()
    })
  })

prog
  .command('unsync [paths...]')
  .action(paths => {
    if (!paths.length) {
      log.error('plz specify paths to unsync')

      return exit()
    }

    const options = {
      config: prog.config || 'config.yml',
      theme: prog.theme || 'development',
      slater: prog.slater || 'slater.config.js'
    }

    const slaterconfig = getSlaterConfig(options)
    const shopifyconfig = getShopifyConfig(options)

    const theme = sync(shopifyconfig)

    paths = paths && paths.length ? paths : slaterconfig.out

    wait(1000, [
      theme
        .unsync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          log.info('syncing', percent + '%', true)
        })
    ]).then(() => {
      log.info('syncing', 'complete', true)
      exit()
    })
  })

prog
  .command('init <path>')
  .action(p => {
    const dir = abs(p)
    const reldir = dir.replace(process.cwd(), '')
    const tempfile = path.join(dir, 'temp.zip')
    const release = `https://github.com/the-couch/slater/archive/v${pkg.version}.zip`
    const extracted = path.join(dir, `slater-${pkg.version}`)

    log.info('initializing', reldir, true)

    fs.ensureDir(dir)
      .then(() => download(release, dir, { filename: 'temp.zip' }))
        .then(() => {
          return new Promise((res, rej) => {
            extract(tempfile, { dir }, e => {
              if (e) rej(e)
              res(fs.copy(
                path.join(extracted, '/packages/theme'),
                dir
              ))
            })
          })
        })
        .then(() => fs.remove(tempfile))
        .then(() => fs.remove(extracted))
        .then(() => {
          log.info('initiaizing', 'complete', true)
          exit()
        })
        .catch(e => {
          log.error(e.message || e)
          exit()
        })
  })

if (!process.argv.slice(2).length) {
  prog.outputHelp(txt => {
    console.log(txt)
    exit()
  })
} else {
  prog.parse(process.argv)
}
