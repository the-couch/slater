const fs = require('fs-extra')
const path = require('path')
const merge = require('merge-deep')
const yaml = require('yaml').default

/**
 * internal modules
 */
const {
  log,
  join,
  resolve,
  exists,
} = require('@slater/util')

/**
 * library specific deps
 */
const reloadBanner = require('./reloadBanner.js')

module.exports = function getThemeConfig (options) {
  const slaterconfig = exists(options.config || 'slater.config.js', path => require(path), true)
  const gitignore = exists('.gitignore', path => fs.readFileSync(path, 'utf8'))
  const themeconfig = yaml.parse(exists('src/config.yml', path => (
    fs.readFileSync(path, 'utf8')
  ), true))[options.env || 'development']

  /**
   * exit if the theme info isn't configured
   */
  if (!themeconfig) {
    log(c => ([
      c.red('error'),
      `${options.env} theme configuration does not exist`
    ]))
    exit()
  }

  /**
   * combine ignored files
   */
  const ignored = ['**/scripts/**', '**/styles/**', 'DS_Store']
    .concat(themeconfig.ignore_files || [])
    .concat(gitignore ? require('parse-gitignore')(gitignore) : [])

  themeconfig.ignore_files = ignored

  /**
   * deep merge user config with defaults
   */
  const spaghetticonfig = merge({
    in: '/src/scripts/index.js',
    outDir:'/build/assets',
    watch: options.watch,
    map: options.watch ? 'inline-cheap-source-map' : false,
    alias: {
      scripts: resolve('/src/scripts'),
      styles: resolve('/src/styles')
    },
    banner: options.watch ? reloadBanner : false
  }, slaterconfig)

  /**
   * overwrite paths to ensure they point to the cwd()
   */
  spaghetticonfig.in = join(spaghetticonfig.in)
  spaghetticonfig.outDir = join(spaghetticonfig.outDir)
  spaghetticonfig.filename = spaghetticonfig.filename || path.basename(spaghetticonfig.in, '.js')

  return {
    spaghetticonfig,
    themeconfig
  }
}
