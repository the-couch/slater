#! /usr/bin/env node
'use strict'

const c = require('ansi-colors')
const exit = require('exit')
const write = require('log-update')
const wait = require('w2t')

const sync = require('@slater/sync')
const { log } = require('@slater/util')

const pkg = require('./package.json')
const createApp = require('./lib/app.js')
const getConfigs = require('./lib/getConfigs.js')

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

prog
  .command('deploy')
  .action(() => {
    const app = createApp({
      config: prog.config,
      env: prog.env
    })

    app.build(() => app.deploy())
  })

prog
  .command('sync [paths...]')
  .action(paths => {
    const { themeconfig } = getConfigs({
      config: prog.config,
      env: prog.env
    })
    const theme = sync(themeconfig)

    wait(1000, [
      theme
        .sync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          write(
            c.gray(`@slater/cli`),
            c.blue(`syncing`),
            complete,
            c.gray(`of`),
            total,
            c.gray(`files - ${c.blue(percent + '%')}`)
          )
        })
    ]).then(() => {
      write(c.gray(`@slater/cli`), c.blue(`syncing complete`))
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

    const { themeconfig } = getConfigs({
      config: prog.config,
      env: prog.env
    })
    const theme = sync(themeconfig)

    wait(1000, [
      theme
        .unsync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          write(
            c.gray(`@slater/cli`),
            c.blue(`unsyncing`),
            complete,
            c.gray(`of`),
            total,
            c.gray(`files - ${c.blue(percent + '%')}`)
          )
        })
    ]).then(() => {
      write(c.gray(`@slater/cli`), c.blue(`syncing complete`))
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
