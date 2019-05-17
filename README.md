# Slater
A Shopify development toolkit.

<br />

> This project is an active work in progress! The CLI is stable, but **the theme
> itself is not**.
>
> Want to help? We'd love to have you. Ideas, feedback,
> critiques 👉 shoot us an Issue.

<br />

### Install
```bash
npm i slater -g
```

### Features
- asset pipeline via Webpack, Babel, PostCSS/SASS
- built-in deployment tool
- live reloading
- simple config
- easy integration into existing themes
- starter theme (WIP)

### Table of Contents
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Themes](#themes)
  - [Directory Structure](#directory-structure)
  - [Assets](#assets)
  - [Alias & Env](#alias--env)
- [Command Line](#command-line)
  - [watch](#watch)
  - [build](#build)
  - [sync](#sync)
  - [Options](#options)
- [Deployment](#deployment)
- [Live Reloading](#live-reloading--https)
- [Guides and Tutorials](#guides)
- [Slater in the Wild](#in-the-wild)
- [Contributors](#contributors)
- [License](#license)

<br>

![slater](https://media.giphy.com/media/129ndN2vLNGvbW/giphy.gif)

## Quick Start
The easist way to get started with Slater is `slater init`. `init` outputs a
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
      ignore: [
        'settings_data.json'
      ]
    }
  }
}
```

Then, from the project root:
```bash
slater watch
```

And that's it! Slater will watch your local theme for changes and sync them to
your remote site when they update 🎉.

## Usage
Slater makes some assumptions out of the box, but it can be easily customized to
fit most existing projects.

#### Themes
Slater projects require themes to be defined in the
`slater.config.js`.

By default it looks for a theme called `development`:

```javascript
module.exports = {
  themes: {
    development: { ... }
  }
}
```

You can call it whatever you want though.

```javascript
module.exports = {
  themes: {
    dev: { ... }
  }
}
```

Just be sure to specify your theme name on the CLI:
```bash
slater build --theme dev
```

You can also define as many themes as you like. Use these for a production
theme, staging, or whatever you like.

```javascript
module.exports = {
  themes: {
    dev: { ... },
    test: { ... },
    live: { ... }
  }
}
```

#### Directory Structure
All theme files should be located within a single source directory. By default,
Slater looks for a `/src` directory in your project root.

To adjust this, specify an `in` prop on your config:
```javascript
module.exports = {
  in: '/source'
}
```

Files within this directory will be built and copied to `/build` in
your project root, and then synced to your remote theme.

To adjust your local build directory, specify an `out` prop on your config:
```javascript
module.exports = {
  out: '/dist'
}
```

#### Assets
Slater uses Webpack internally to compile a single JavaScript entry point. By
default, it looks for `/src/scripts/index.js`.

You can specify a different entry point using the `assets` object on your
config:
```javascript
module.exports = {
  assets: {
    in: '/source/scripts/index.js'
  }
}
```

Slater uses PostCSS by default. It's configured to allow SASS-like nesting, in
addition to all modern CSS goodies.

To compile your styles, simply import your root stylesheet into your JavaScript
entrypoint:
```javascript
import '../styles.css'

// rest of your project scripts
```

You can also use SASS. Simple specify the `sass` preset in your assets config:
```javascript
module.exports = {
  assets: {
    presets: [
      'sass'
    ]
  }
}
```

#### Alias & Env
To make your JavaScript a little easier to work with, Slater supports alias
definitions and environment variables.

```javascript
module.exports = {
  alias: {
    components: './src/scripts/components'
  },
  env: {
    API_KEY: 'abcde...'
  }
}
```

Which you can then use in your JavaScript like this:
```javascript
import api from 'components/api.js'

const fetcher = api({
  key: API_KEY
})
```

For convenience, there's also a built-in alias `@` that points to the directory
containing your JavaScript entry point.

> Keep in mind, these environment variables are **public**, so don't use them
> for any secret keys, passwords, or any value that you need to keep private!

## Command Line

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

#### Options
Any of the core commands can be combined with the following options:

- `--config <path>` - specify the path to your config file
- `--theme <name>` - specify a named theme from your config file

## Deployment
To deploy a theme, combine the above commands as needed:
```
slater build && slater sync --theme production
```

## Live-reloading & HTTPS
`slater` uses an local SSL certification to correspond with Shopify's HTTPS
hosted themes. To take advantage of live-reloading, you need to create a
security exception for the `slater` cert (this is safe). To do this, load
[https://localhost:3000](https://localhost:3000) in your browser, and follow
the instructions for adding an exception. If it works, you should see this in
your browser window:
```
slater running
```

### Guides
[Adding Slater to any existing Theme](https://medium.com/the-couch/getting-started-with-slater-bundling-and-deployment-with-any-existing-shopify-theme-d994a17f590f)

## In the Wild
The following sites were built using some version of Slater. Send us a PR to add
to this list!
- [Wool & Oak](https://www.woolandoak.com)
- [Blume](https://www.meetblume.com)
- [Fur](https://www.furyou.com)
- [Dims Home](https://www.dimshome.com)

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT License © [The Couch](https://thecouch.nyc)
