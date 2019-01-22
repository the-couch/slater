#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const yaml = require('yaml').default
const write = require('log-update')
const exit = require('exit')
const wait = require('w2t')
const { log, exists, join } = require('@slater/util')

const pkg = require('./package.json')

const prog = require('commander')
  .option('-c, --config <path>', 'specify a path to a Shopify config.yml file')
  .option('-t, --theme <name>', 'specify a theme name from your config file')
  .parse(process.argv)

const gitignore = exists('.gitignore', path => fs.readFileSync(path, 'utf8'))
const themeconfig = yaml.parse(exists(prog.config || './config.yml', path => (
  fs.readFileSync(path, 'utf8')
), true))[prog.theme || 'development']

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

const theme = require('./index.js')({
  password: themeconfig.password,
  store: themeconfig.store,
  theme_id: themeconfig.theme_id,
  ignore_files: ignored
})

prog
  .command('upload [paths...]')
  .action(paths => {
    theme
      .sync(paths, (total, rest) => {
        const complete = total - rest
        const percent = Math.ceil((complete / total) * 100)
        write(`uploading ${complete} of ${total} files (${percent}%)`)
      })
      .then(() => {
        write(`uploading complete`)
      })
  })

prog
  .command('remove [paths...]')
  .action(paths => {
    if (!paths.length) {
      log(c => ([
        c.red('error'),
        `must specify paths to remove`
      ]))

      return exit()
    }

    wait(1000, [
      theme
        .unsync(paths, (total, rest) => {
          const complete = total - rest
          const percent = Math.ceil((complete / total) * 100)
          write(`removing ${complete} of ${total} files (${percent}%)`)
        })
    ])
      .then(() => {
        write(`removing complete`)
      })
  })

prog.parse(process.argv)
