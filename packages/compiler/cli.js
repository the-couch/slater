#! /usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const exit = require('exit')
const onExit = require('exit-hook')
const match = require('matched')
const log = require('log-update')
const c = require('ansi-colors')

const cwd = process.cwd()
const pkg = require('./package.json')
const rolaCompiler = require('./index.js')
const postcss = require('@rola/preset-postcss')

const prog = require('commander')
  .version(pkg.version)
  .option('--out <output>', '')
  .option('--reload', 'enable live-reloading after changes: --reload (default: false)')

let config = {}

try {
  config = require(path.join(cwd, 'rola.config.js'))
} catch (e) {}

function mergeConfig (inputs) {
  //console.log('mergeConfig')
  //console.log(inputs)
  const cli = inputs.length ? {
    in: inputs.reduce((entry, file) => {
      if (/\*+/g.test(file)) {
        const files = match.sync(path.join(cwd, file))

        files.map(file => {
          entry[path.basename(file, '.js')] = file
        })
      } else {
        entry[path.basename(file, '.js')] = file
      }

      return entry
    }, {}),
    out: prog.out || cwd,
    reload: prog.reload || false,
    presets: [
      postcss()
    ]
  } : {}

  const conf = Object.assign(cli, config)

  /**
   * assertions
   */
  if (!conf.in) {
    console.error(`config error: missing 'in' prop`)
  }
  if (!conf.out) {
    console.error(`config error: missing 'out' prop`)
  }

  /**
   * fail
   */
  if (!conf.in || !conf.out) {
    exit()
  }

  return conf
}

function output (errors = [], stats = []) {
  const banner = `${c[errors.length ? 'bgRed' : 'bgBlue'](c.white(' rola '))} v${pkg.version}`

  log(`
  ${banner}

  ${stats.map(stats => {
    return [
      c.blue(stats.duration + 's')
    ].concat(
      stats.assets
        .filter(asset => !/\.map$/.test(asset.name))
        .map(asset => {
          return `  ${asset.name.padEnd(12)} ${c.gray(asset.size + 'kb')}`
        })
    ).join('\n  ')
  }).join('\n  ')}

  ${errors.map(e => e.message).join('\n  ')}
`)
}

prog
  .command('watch [inputs...]')
  .action(inputs => {
    output()
    const compiler = rolaCompiler(mergeConfig(inputs))
    compiler.on('error', e => {
      output(e)
    })
    compiler.on('stats', stats => {
      output([], stats)
    })
    compiler.watch()
    onExit(() => compiler.close())
  })

prog
  .command('build [inputs...]')
  .action(inputs => {
    output()
    const compiler = rolaCompiler(mergeConfig(inputs))
    compiler.on('error', e => {
      output(e)
    })
    compiler.on('done', stats => {
      output([], stats)
    })
    compiler.build()
  })

if (!process.argv.slice(2).length) {
  prog.outputHelp(txt => {
    console.log(txt)
    exit()
  })
} else {
  prog.parse(process.argv)
}
