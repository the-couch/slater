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
      id: '18170904623',
      password: 'b8e05961e855c04c3806662da2549a30',
      store: 'slater-demo.myshopify.com',
      ignore: [
        'settings_data.json' // ignore this to avoid overriding theme settings on sync
      ]
    }
  }
}
