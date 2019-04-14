const path = require('path')

module.exports = {
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
