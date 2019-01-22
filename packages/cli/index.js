#! /usr/bin/env node
'use strict'

const pkg = require('./package.json')
const createApp = require('./lib/app.js')

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <path>', 'specify a path to a slater config file')
  .option('-e, --env <environment>', 'specify a named theme from your config.yml file')

prog
  .command('watch')
  .action(() => {
    const app = createApp({
      watch: true,
      config: prog.config,
      env: prog.env
    })

    app.watch()
  })

prog.parse(process.argv)
