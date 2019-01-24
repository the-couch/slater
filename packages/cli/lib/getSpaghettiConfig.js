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
  const slaterconfig = exists(options.slater || 'slater.config.js', path => require(path), true)

  /**
   * deep merge user config with defaults
   */
  const spaghetticonfig = merge({
    in: '/src/scripts/index.js',
    outDir:'/build/assets',
    watch: options.watch,
    map: options.watch ? 'inline-cheap-source-map' : false,
    alias: {
      '/': resolve(process.cwd())
    },
    banner: options.watch ? reloadBanner : false
  }, slaterconfig)

  /**
   * overwrite paths to ensure they point to the cwd()
   */
  spaghetticonfig.in = join(spaghetticonfig.in)
  spaghetticonfig.outDir = join(spaghetticonfig.outDir)
  spaghetticonfig.filename = spaghetticonfig.filename || path.basename(spaghetticonfig.in, '.js')

  return spaghetticonfig
}
