const fs = require('fs-extra')
const path = require('path')
const merge = require('merge-deep')
const exit = require('exit')

/**
 * internal modules
 */
const abs = require('./abs.js')
const logger = require('./logger.js')
const log = logger('@slater/util')

const reloadBanner = `
  ;(function (global) {
    try {
      var ls = global.localStorage

      var scrollPos = ls.getItem('slater-scroll')

      if (scrollPos) {
        global.scrollTo(0, scrollPos)
      }

      var socketio = document.createElement('script')

      socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'

      socketio.onload = function init () {
        var disconnected = false
        var socket = io('https://localhost:3000', {
          reconnectionAttempts: 3
        })
        socket.on('connect', () => console.log('@slater/cli connected'))
        socket.on('refresh', () => {
          ls.setItem('slater-scroll', global.scrollY)
          global.location.reload()
        })
        socket.on('disconnect', () => {
          disconnected = true
        })
        socket.on('reconnect_failed', e => {
          if (disconnected) return
          console.error("@slater/cli - Connection to the update server failed. Please visit https://localhost:3000 in your browser to trust the certificate. Then, refresh this page.")
        })
      }

      document.head.appendChild(socketio)
    } catch (e) {}
  })(this);
`

module.exports = function getConfig (options) {
  const configpath = abs(options.slater)
  const exists = fs.existsSync(configpath)

  if (!exists) {
    log.error(`looks like your ${options.slater} file is missing`)
    exit()
  }

  const slaterconfig = require(configpath)

  /**
   * deep merge user config with defaults
   */
  const config = merge({
    js: {
      in: '/src/scripts/index.js',
      outDir: '/build/assets',
      map: options.watch ? 'inline-cheap-source-map' : 'cheap-module-source-map',
      alias: {
        '/': process.cwd()
      },
      banner: options.watch ? reloadBanner : false
    },
    in: '/src',
    out:'/build',
    watch: options.watch
  }, slaterconfig)

  /**
   * overwrite paths to ensure they point to the cwd()
   */
  config.in = abs(config.in)
  config.out = abs(config.out)
  config.js.in = abs(config.js.in)
  config.js.outDir = abs(config.js.outDir)
  config.js.filename = config.js.filename || path.basename(config.js.in, '.js')

  return config
}
