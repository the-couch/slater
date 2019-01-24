#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const yaml = require('yaml').default
const write = require('log-update')
const exit = require('exit')
const wait = require('w2t')
const { logger, exists, join } = require('@slater/util')

const pkg = require('./package.json')

const prog = require('commander')
  .option('-c, --config <path>', 'specify a path to a config.yml file')
  .option('-t, --theme <name>', 'specify a named theme from your config.yml file')
  .parse(process.argv)

const theme = require('./index.js')(prog)

const log = logger('@slater/sync')

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
    ]).then(() => {
      log.info('syncing', 'complete', true)
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
    ]).then(() => {
      log.info('syncing', 'complete', true)
      exit()
    })
  })

prog.parse(process.argv)
