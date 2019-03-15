# slater
A Shopify theme development toolkit.

<br />

> This project is an active work in progress. The CLI is stable, but the theme
> needs some TLC. Want to help? We'd love to have you. Ideas, feedback,
> critiques 👉 shoot us an Issue.

<br />

## Features
- bare-bones base theme
- JS and CSS compilation via [spaghetti](https://github.com/the-couch/spaghetti)
- live reloading
- easy config
- simple CLI

## Install
```bash
npm i -g @slater/cli
```

## Guides
[Adding Slater to any existing Theme](https://medium.com/the-couch/getting-started-with-slater-bundling-and-deployment-with-any-existing-shopify-theme-d994a17f590f)

## Getting Started
The easist way to get started with `slater` is `slater init`. `init` outputs a
default folder structure into the directory of your choice.

```bash
slater init <root>
```

Don't forget to install the dependencies.

```bash
npm install
```

You'll need to define one or more themes in the provided `slater.config.js` file
to deploy to, similar to a standard Shopify `config.yml` file.

```javascript
module.exports = {
  themes: {
    development: {
      id: '12345...',
      password: 'abcde...',
      store: 'store-name.myshopify.com',
      ignore: []
    }
  }
}
```

Then, from the project root:

```bash
slater watch
```

And that's it! `slater` will watch your local theme for changes and sync them to
your remote site when they update 🎉.

## Configuration
By default, `slater` looks for a `slater.config.js` file in the project root.
Defaults below:
```javascript
module.exports = {
  in: '/src',
  out: '/build',
  assets: '/src/scripts/index.js',
  themes: {}
}
```
#### Themes
Themes are configured similarly to a standard Shopify `config.yml` file.
```javascript
module.exports = {
  themes: {
    development: {
      id: '12345...',
      password: 'abcde...',
      store: 'store-name.myshopify.com',
      ignore: [ 'snippets/test.liquid' ]
    }
  }
}
```
You can define as many as you like:

```javascript
module.exports = {
  themes: {
    sandbox: { ... },
    development: { ... },
    production: { ... }
  }
}
```

And reference each using the `--theme` flag on the CLI (defaults to
`development`).

```bash
slater sync --theme production
```

#### Using SCSS
We used PostCSS by default, but you can push a custom config object to enable
SCSS compiling. Modify your `slater.config.js` as follows:

```javascript
module.exports = {
  // ...
  assets: {
    in: '/src/scripts/index.js',
    sass: true
  }
}
```

#### Assets
`slater` uses [spaghetti](https://github.com/the-couch/spaghetti) internally to
compile JS and CSS, using most goodies you'll want from the Babel and PostCSS
ecosystems.

To compile CSS, just import your root stylesheet into your JavaScript index file
*a la*:
```javascript
import '../main.css'

/* your code here */
```

## Commands

#### `watch`
Watches for file changes and syncs updates to your specified theme.
```bash
slater watch
```

#### `build`
Compiles assets and copies all files from the `config.in` directory to the
`config.out` directory.
```bash
slater build
```

#### `sync`
Sync local files or directories to your remote theme. A direct interface to
[@slater/sync], which `@slater/cli` uses internally.
```bash
slater sync build/snippets/hero.liquid # file
slater sync build/snippets # directory
slater sync # defaults to config.out
```

### Options
Any of the core commands can be combined with the following options:

- `--config <path>` - specify the path to your config file
- `--theme <name>` - specify a named theme from your config file

## Deployment
To deploy a theme, combine the above commands as needed:
```
slater build && slater sync --theme production
```

## API
`slater` can also be used directly in node. The configuration is the same, but
instead of `themes`, simply define a single `theme`:
```javascript
// see options above
const config = {
  in: '/theme',
  out: '/dist',
  assets: '/theme/js/index.js',
  theme: {
    id: '',
    password: '',
    store: '',
    ignore: []
  }
}

const app = require('@slater/cli')(config)
```

### Methods
All methods return a `Promise`.

#### `build`
Compile assets.
```javascript
app.build().then(() => console.log('all done!'))
```

#### `watch`
Watches for file changes and syncs updates to your specified theme.
```javascript
app.watch()
```

#### `copy`
Copies all files from the `config.in` directory to the `config.out` directory.
```javascript
app.copy()
```

## Live-reloading & HTTPS
`slater` uses an local SSL certification to correspond with Shopify's HTTPS
hosted themes. To take advantage of live-reloading, you need to create a
security exception for the `slater` cert (this is safe). To do this, load
[https://localhost:3000](https://localhost:3000) in your browser, and follow
the instructions for adding an exception. If it works, you should see this in
your browser window:
```
@slater/cli successfully connected
```

## In the Wild

List of sites out in the wild currently running some version of Slater. Feel free to PR to add sites if you end up using Slater.

- [Wool & Oak](https://www.woolandoak.com)
- [Blume](https://www.meetblume.com)
- [Fur](https://www.furyou.com)
- [Dims Home](https://www.dimshome.com)

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/estrattonbailey.png?s=150">
        <br />
        <a href="https://github.com/estrattonbailey">Eric Bailey</a>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/iamkevingreen.png?s=150">
        <br />
        <a href="https://github.com/iamkevingreen">Kevin Green</a>
      </td>
    </tr>
  </tbody>
</table>

## License
MIT License
© The Couch
