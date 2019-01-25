const fs = require('fs-extra')
const path = require('path')
const merge = require('merge-deep')
const yaml = require('yaml').default

/**
 * internal modules
 */
const {
  logger,
  join,
  resolve,
  exists,
} = require('@slater/util')

/**
 * library specific deps
 */
const reloadBanner = require('./reloadBanner.js')

const log = logger('@slater/cli')

module.exports = function getSpaghettiConfig (options) {
  const slaterconfig = exists(options.slater, path => require(path), true)

  /**
   * deep merge user config with defaults
   */
  const config = merge({
    js: {
      in: '/src/scripts/index.js',
      outDir: '/build/assets',
      map: options.watch ? 'inline-cheap-source-map' : 'cheap-module-source-map',
      alias: {
        '/': resolve(process.cwd())
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
  config.js.in = join(config.js.in)
  config.js.outDir = join(config.js.outDir)
  config.js.filename = config.js.filename || path.basename(config.js.in, '.js')

  return config
}
