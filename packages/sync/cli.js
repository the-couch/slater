#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const yaml = require('yaml').default
const write = require('log-update')
const exit = require('exit')
const wait = require('w2t')
const {
  logger,
  getConfig
} = require('@slater/util')

const pkg = require('./package.json')

const log = logger('@slater/sync')

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <path>', 'specify the path to your config file')
  .option('-t, --theme <name>', 'specify a named theme from your config file')
  .parse(process.argv)

const theme = require('./index.js')(getConfig(prog))

prog
  .command('sync [paths...]')
  .action(paths => {
    wait(1000, [
      theme
        .sync(paths, (total, rest) => {
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
  .command('unsync [paths...]')
  .action(paths => {
    if (!paths.length) {
      log(c => ([
        c.red('error'),
        `must specify paths to unsync`
      ]))

      return exit()
    }

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

prog.parse(process.argv)
