const fs = require('fs-extra')
const path = require('path')
const merge = require('merge-deep')
const exit = require('exit')

/**
 * internal modules
 */
const abs = require('./abs.js')
const logger = require('./logger.js')
const log = logger('slater')

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
    assets: {
      in: '/src/scripts/index.js',
      out: '/build/assets',
      presets: [
        'maps'
      ]
    }
  }, require(configpath))

  config.assets.alias = {
    '@': abs(path.dirname(config.assets.in)),
    ...(config.assets.alias || {})
  }

  /*
   * add reference to theme we're dealing with
   */
  config.theme = {}

  try {
    config.theme = config.themes[options.theme || 'development']
  } catch (e) {
    log.warn(`config`, `config for ${options.theme || 'development'} theme is missing`)
  }

  if (!config.theme) {
    log.error(`your ${options.theme} theme appears to be missing`)
    exit()
  }

  config.theme.name = options.theme || 'development'

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
  config.in = abs(config.in || '/src')
  config.out = abs(config.out || '/build')

  return config
}
