const path = require('path')
const fs = require('fs')
const yaml = require('yaml').default

const { password, store, theme_id } = yaml.parse(fs.readFileSync('./config.yml', 'utf8')).development

const theme = require('../index.js')({
  password,
  store,
  theme_id,
  cwd: path.join(__dirname, 'theme')
})

// theme.upload('templates/index.liquid', '/theme/templates/index.liquid')
// theme.remove('snippets/theme-provider.liquid')
theme.deploy()
