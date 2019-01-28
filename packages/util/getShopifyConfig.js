const fs = require('fs-extra')
const yaml = require('yaml').default
const exit = require('exit')

/**
 * internal modules
 */
const abs = require('./abs.js')
const logger = require('./logger.js')
const log = logger('@slater/util')

module.exports = function getShopifyConfig (options) {
  let config = {
    password: options.password,
    theme_id: options.theme_id,
    store: options.store,
    ignore_files: [].concat(options.ignore_files || [], [
      '**/scripts/**',
      '**/scripts',
      '**/styles/**',
      '**/styles',
      'DS_Store',
      '*.yml',
      '.DS_Store',
      'node_modules'
    ])
  }

  if (options.config) {
    const configpath = abs(options.config)
    const exists = fs.existsSync(configpath)

    if (!exists) {
      log.error(`looks like your config.yml is missing`)
      exit()
    }

    const conf = yaml.parse(
      fs.readFileSync(configpath, 'utf8')
    )[options.theme || 'development']

    /**
     * exit if the theme info isn't configured
     */
    if (!conf) {
      log.error(`whoops, we can't find your ${options.theme} theme!`)
      exit()
    }

    config.password = conf.password
    config.theme_id = conf.theme_id
    config.store = conf.store
    config.ignore_files = config.ignore_files.concat(conf.ignore_files || [])
  }

  if (!config.password || !config.theme_id || !config.store) {
    log.error(`have a look at the configuration for your ${options.theme} theme`)
    exit()
  }

  return config
}
