# @slater/sync
A subset of [@Shopify/themekit](https://github.com/Shopify/themekit) API written in JavaScript.

## Usage
All methods return `Promise`s.

First, create an instance:
```javascript
const sync = require('@slater/sync')

const theme = sync({
  password: 'abcde12345',
  store: 'slater-demo.myshopify.com',
  theme_id: 123456789,
  cwd: process.cwd(),
  ignore_files: [
    'settings_data.json'
  ]
})
```
### upload
```javascript
theme.upload('templates/index.liquid', './path/to/file.liquid')
```
### remove
```javascript
theme.remove('templates/index.liquid')
```
### deploy
Replace all remote theme files with local versions.
```javascript
theme.deploy()
```

## License
MIT License
(c) The Couch
