const path = require('path')

/**
 * default config
 */
module.exports = {
  in: '/src',
  out: '/build',
  assets: {
    in: '/src/scripts/index.js',
    alias: {
      '@': path.join(process.cwd(), '/src/scripts')
    }
  },
  themes: {
    development: {
      id: '',
      password: '',
      store: '',
      ignore: [
        'settings_data.json' // leave this here to avoid overriding theme settings on sync
      ]
    }
  }
}
