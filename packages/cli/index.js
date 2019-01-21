#! /usr/bin/env node
'use strict'

const fs = require('fs-extra')
const path = require('path')
const c = require('ansi-colors')
const onExit = require('exit-hook')
const exit = require('exit')
const chokidar = require('chokidar')
const mm = require('micromatch')
const yaml = require('yaml').default
const command = require('commander')

const spaghetti = require('@friendsof/spaghetti')

const themekit = require('@slater/sync')

const pkg = require('./package.json')
const { socket, closeServer } = require('./lib/socket.js')
const { log, join, resolve } = require('./lib/util.js')

log(c.gray(`v${pkg.version}`))

command
  .version(pkg.version)
  .command('build')
  .parse(process.argv)

log(command)

const {
  _: args,
  config: configFile = 'slater.config.js',
  env = 'development',
  debug,
  ...props
} = require('minimist')(process.argv.slice(2))

if (debug) require('inspector').open()

const watch = args[0] === 'watch'
const deploy = args[0] === 'deploy'
const build = args[0] === 'build' || (!watch && !deploy)
const gitignore = fs.readFileSync(join('.gitignore'))
const userConfig = fs.existsSync(join(configFile)) ? require(join(configFile)) : {}
const themeConfig = yaml.parse(fs.readFileSync(join('src/config.yml'), 'utf8'))[env]

let ignoredFiles = [
  '**/scripts/**',
  '**/styles/**',
  /DS_Store/
].concat(
  themeConfig.ignore_files || []
).concat(
  gitignore ? require('parse-gitignore')(gitignore) : []
)

// const theme = themekit({
//   password: themeConfig.password,
//   store: themeConfig.store,
//   theme_id: themeConfig.theme_id,
//   ignore_files: ignoredFiles
// })

// const config = Object.assign({
//   in: '/src/scripts/index.js',
//   outDir:'/build/assets',
//   watch,
//   map: watch ? 'inline-cheap-source-map' : false,
//   alias: {
//     scripts: resolve('/src/scripts'),
//     styles: resolve('/src/styles')
//   },
//   banner: watch ? `
//     ;(function (global) {
//       try {
//         var ls = global.localStorage

//         var scrollPos = ls.getItem('slater-scroll')

//         if (scrollPos) {
//           global.scrollTo(0, scrollPos)
//         }

//         var socketio = document.createElement('script')

//         socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'

//         socketio.onload = function init () {
//           var disconnected = false
//           var socket = io('https://localhost:3000', {
//             reconnectionAttempts: 3
//           })
//           socket.on('connect', () => console.log('@slater/cli connected'))
//           socket.on('refresh', () => {
//             ls.setItem('slater-scroll', global.scrollY)
//             global.location.reload()
//           })
//           socket.on('disconnect', () => {
//             disconnected = true
//           })
//           socket.on('reconnect_failed', e => {
//             if (disconnected) return
//             console.error("@slater/cli - Connection to the update server failed. Please visit https://localhost:3000 in your browser to trust the certificate. Then, refresh this page.")
//           })
//         }

//         document.head.appendChild(socketio)
//       } catch (e) {}
//     })(this);
//   ` : false
// }, userConfig)

// config.in = join(config.in)
// config.outDir = join(config.outDir)
// config.filename = config.filename || path.basename(config.in, '.js')

// const bundle = spaghetti(config)

