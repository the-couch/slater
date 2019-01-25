# @slater/sync
Sync files between your local machine and a remote Shopify theme.

## Usage
```javascript
const sync = require('@slater/sync')

const theme = sync({
  config: './config.yml',
  theme: 'development'
})

// or skip the config.yml
const theme = sync({
  password: 'abcde12345',
  store: 'slater-demo.myshopify.com',
  theme_id: 123456789,
  ignore_files: [
    'settings_data.json'
  ]
})
```

### sync
```javascript
theme.sync([
  './build/snippets/nav.liquid'
])

// multiple files
theme.sync([
  './build/snippets/nav.liquid',
  './build/templates/index.liquid'
])

// or a directory
theme.sync([
  './build/snippets/'
])
```

### unsync
```javascript
theme.unsync([ 'templates/index.liquid' ])
```

## License
MIT License
© The Couch
