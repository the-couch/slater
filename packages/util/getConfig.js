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

module.exports = function getConfig (options) {
  const configpath = abs(options.config || 'slater.config.js')

  if (!fs.existsSync(configpath)) {
    log.error(`looks like your config file (${options.config || 'slater.config.js'}) is missing`)
    exit()
  }

  /**
   * deep merge user config with defaults
   */
  const config = merge({
    in: '/src',
    out:'/build',
    assets: '/src/scripts/index.js'
  }, require(configpath))

  if (!config.themes) {
    log.error(`you haven't defined any themes!`)
    exit()
  }

  /*
   * add reference to theme we're dealing with
   */
  config.theme = config.themes[options.theme || 'development']

  if (!config.theme) {
    log.error(`your ${options.theme} theme appears to be missing`)
    exit()
  }

  config.theme.ignore = [].concat(config.theme.ignore || [], [
    '**/scripts/**',
    '**/scripts',
    '**/styles/**',
    '**/styles',
    'DS_Store',
    '*.yml',
    '.DS_Store',
    'node_modules'
  ])

  /**
   * overwrite paths to ensure they point to the cwd()
   */
  config.in = abs(config.in)
  config.out = abs(config.out)
  config.assets = abs(config.assets)

  // spaghetti options
  config.spaghetti = {
    in: config.assets,
    outDir: path.join(config.out, 'assets'), // has to go here
    filename: path.basename(config.assets, '.js'),
    alias: {
      '/': process.cwd()
    }
  }

  return config
}
