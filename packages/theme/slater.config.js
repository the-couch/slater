/**
 * default config
 */
module.exports = {
  in: '/src',
  out: '/build',
  assets: '/src/scripts/index.js',
  themes: {
    development: {
      id: '',
      password: '',
      store: '',
      ignore: [
        'settings_data.json' // ignore this to avoid overriding theme settings on sync
      ]
    }
  }
}
