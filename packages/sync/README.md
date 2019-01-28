# @slater/sync
Sync files between your local machine and a remote Shopify theme.

## Install
```bash
npm i -g @slater/sync
```

## Getting Started
Create a `slater.config.js` file, and define one or more themes:

```javascript
module.exports = {
  themes: {
    development: {
      id: '12345...',
      password: 'abcde...',
      store: 'store-name.myshopify.com',
      ignore: []
    },
    production: { ... }
  }
}
```

Then, use the CLI to `sync` or `unsync` files or directories:
```bash
slater-sync sync snippets/header.liquid # file
slater-sync sync snippets/ # directory
slater-sync unsync snippets/header.liquid
```

## Commands

#### `sync`
Sync a file or directory.
```bash
slater-sync sync snippets/header.liquid # file
slater-sync sync snippets/ # directory
```

#### `unsync`
Un-sync a file or directory.
```bash
slater-sync unsync snippets/header.liquid # file
slater-sync unsync snippets/ # directory
```

## API
`@slater/sync` can also be used in node, as it is in
[@slater/cli](https://github.com/the-couch/slater/tree/master/packages/cli).

```javascript
const sync = require('@slater/sync')

const theme = sync({
  id: '12345...',
  password: 'abcde...',
  store: 'store-name.myshopify.com',
  ignore: []
})
```

### Methods

#### `sync`
```javascript
// single file
theme.sync('./build/snippets/nav.liquid')

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

#### `unsync`
```javascript
theme.unsync([ 'templates/index.liquid' ])
```

## License
MIT License
© The Couch
