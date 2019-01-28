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
  getConfig
} = require('@slater/util')

const pkg = require('./package.json')
const createApp = require('./index.js')

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <path>', 'specify the path to your config file')
  .option('-t, --theme <name>', 'specify a named theme from your config file')

const log = logger('@slater/cli')

prog
  .command('watch')
  .action(() => {
    const config = getConfig(prog)
    const app = createApp(config)

    app.copy().then(app.watch)
  })

prog
  .command('build')
  .action(() => {
    const config = getConfig(prog)
    const app = createApp(config)

    app.copy().then(app.build).then(() => exit())
  })

prog
  .command('sync [paths...]')
  .action(paths => {
    const config = getConfig(prog)
    const theme = sync(config.theme)

    paths = paths && paths.length ? paths : config.out

    wait(1000, [
      theme
        .sync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          log.info('syncing', percent + '%', true)
        })
    ])
      .then(() => {
        log.info('sync', 'complete', true)
        exit()
      })
      .catch(({ errors, key }) => {
        log.error(`syncing ${key} failed - ${errors.asset.join('  ')}`)
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

    const config = getConfig(prog)
    const theme = sync(config.theme)

    paths = paths && paths.length ? paths : config.out

    wait(1000, [
      theme
        .unsync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          log.info('syncing', percent + '%', true)
        })
    ])
      .then(() => {
        log.info('syncing', 'complete', true)
        exit()
      })
      .catch(({ errors, key }) => {
        log.error(`syncing ${key} failed - ${errors.asset.join('  ')}`)
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
