![repo-banner](https://user-images.githubusercontent.com/4732330/59070492-e925a900-8888-11e9-9dd5-90fb7b8da034.png)

```bash
npm i slater -g
```
<br />

A new toolkit for building and deploying themes on Shopify.

<br />

> This project is an active work in progress!
>
> The CLI for compiling and uploading themes is stable, but **the starter theme
> needs some love!**
>
> Want to help? We'd love to have you. Ideas, feedback,
> critiques 👉 shoot us an Issue.

<br />

## Features
- asset pipeline via Webpack, Babel, PostCSS/SASS
- built-in deployment tool
- live reloading
- simple config
- easy integration into existing themes
- starter theme (WIP)

## Table of Contents
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Themes](#themes)
  - [Directory Structure](#directory-structure)
  - [Assets](#assets)
  - [Typescript](#typescript)
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

### Themes
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

#### Theme IDs and Passwords
Each of these themes should have its own theme `id` value. Theme IDs can be
found by going to *Online Store > Themes > Customize Theme* and plucking the ID
from the URL i.e. `../admin/themes/<id>/editor`.

All themes can use the same `password` property. To get one, [create your own
private
app](https://help.shopify.com/en/api/getting-started/authentication/private-authentication)
and pull it from there. Make sure your private app allows for read/write to the
"Theme templates and theme assets".

### Directory Structure
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

### Assets
Slater uses Webpack internally to compile a single JavaScript entry point. By
default, it looks for `/src/scripts/index.js`.

You can specify a different entry point using the `assets` object on your
config:
```javascript
module.exports = {
  assets: {
    in: '/src/scripts/index.js'
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
    in: '/src/scripts/index.js'
  assets: {
    presets: [
      'sass'
    ]
  }
}
```

### Typescript
Specify `typescript` preset in your assets config to enable Typescript support:
```javascript
module.exports = {
    in: '/src/scripts/index.js'
  assets: {
    presets: [
      'typescript'
    ]
  }
}
```

Then add `index.ts` file to `/src/scripts/` folder and modify your entry js file (`/src/scripts/index.js` by default) to import new typescript entry file:
```javascript
import './index.ts' // path to your entry .ts file

// rest of your project scripts
```

You can copy rest of the projects scripts and styles import to typescript file, leaving only one import line in js file. Last step is to add `tsconfig.json` file to the root of your project:
```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": false,
    "target": "es2015"
  },
  "exclude": ["node_modules", "slater.config.js", "test.config.js"]
}
```

### Alias & Env
To make your JavaScript a little easier to work with, Slater supports alias
definitions and environment variables.

```javascript
module.exports = {
  assets: {
    in: '/src/scripts/index.js'
    alias: {
      components: './src/scripts/components'
    },
    env: {
      API_KEY: JSON.stringify('abcde'),
    }
  },
  themes: {
    // ...
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

**N.B.** Keep in mind, these environment variables are **public**, so don't use
them for any secret keys, passwords, or any value that you need to keep private!
Also, these values are passed directly to Webpack's Define Plugin, so please
refer to [those docs](https://webpack.js.org/plugins/define-plugin/) for
clarity.

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
[https://localhost:4000](https://localhost:4000) in your browser, and follow
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
- [A24](https://shop.a24films.com)
- [Fur](https://www.furyou.com)
- [Dims Home](https://www.dimshome.com)
- [Roll or Die](https://rollordie.shop)
- [The Elder Statesman](https://elder-statesman.com/)
- [Fresh Water Systems](https://www.freshwatersystems.com)


## Contributing
Slater uses [lerna](https://lerna.js.org/) to manage the monorepo. That makes developing locally pretty simple, but a little different from what you might be used to. Use the steps below to get up and running locally:

1. Clone this repository
2. From the project root, install core dependencies with `npm i`
2. From the project root, run `npm run bootstrap`
3. Define a `packages/theme/test.config.js` file with your Slater config data
4. Use the `test` specific commands in `/theme/package.json` to run your local theme
5. Make neat, granular commits
    1. Be descriptive
    2. Reference open/closed issues where applicable
6. Open a pull request!

**Important:** don't increment any of the core package versions. The core Slater team will handle versioning when publishing to npm.

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/estrattonbailey"><img src="https://github.com/estrattonbailey.png?s=100" width="100px;" alt="Eric Bailey"/><br /><sub><b>Eric Bailey</b></sub></a><br /><a href="https://github.com/the-couch/slater/commits?author=estrattonbailey" title="Code">💻</a> <a href="https://github.com/the-couch/slater/commits?author=estrattonbailey" title="Documentation">📖</a> <a href="#review-estrattonbailey" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-estrattonbailey" title="Maintenance">🚧</a></td><td align="center"><a href="https://github.com/iamkevingreen"><img src="https://github.com/iamkevingreen.png?s=100" width="100px;" alt="Kevin Green"/><br /><sub><b>Kevin Green</b></sub></a><br /><a href="https://github.com/the-couch/slater/commits?author=iamkevingreen" title="Code">💻</a> <a href="https://github.com/the-couch/slater/commits?author=iamkevingreen" title="Documentation">📖</a> <a href="#review-iamkevingreen" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-iamkevingreen" title="Maintenance">🚧</a></td><td align="center"><a href="https://github.com/Jore"><img src="https://avatars3.githubusercontent.com/u/696506?v=4" width="100px;" alt="Joe Refoy"/><br /><sub><b>Joe Refoy</b></sub></a><br /><a href="https://github.com/the-couch/slater/issues?q=author%3AJore" title="Bug reports">🐛</a> <a href="https://github.com/the-couch/slater/commits?author=Jore" title="Code">💻</a> <a href="#maintenance-Jore" title="Maintenance">🚧</a></td><td align="center"><a href="https://github.com/wardpenney"><img src="https://avatars1.githubusercontent.com/u/615249?v=4" width="100px;" alt="Ward Penney"/><br /><sub><b>Ward Penney</b></sub></a><br /><a href="https://github.com/the-couch/slater/issues?q=author%3Awardpenney" title="Bug reports">🐛</a> <a href="https://github.com/the-couch/slater/commits?author=wardpenney" title="Documentation">📖</a></td><td align="center"><a href="https://www.tomaszbujnowicz.com"><img src="https://avatars0.githubusercontent.com/u/557199?v=4" width="100px;" alt="Tomasz Bujnowicz"/><br /><sub><b>Tomasz Bujnowicz</b></sub></a><br /><a href="https://github.com/the-couch/slater/issues?q=author%3Atomaszbujnowicz" title="Bug reports">🐛</a> <a href="https://github.com/the-couch/slater/commits?author=tomaszbujnowicz" title="Code">💻</a></td><td align="center"><a href="https://www.sean-orfila.com"><img src="https://avatars3.githubusercontent.com/u/7729784?v=4" width="100px;" alt="Sean Orfila"/><br /><sub><b>Sean Orfila</b></sub></a><br /><a href="#question-seandogg" title="Answering Questions">💬</a></td><td align="center"><a href="https://www.antonio-p-ortiz.com"><img src="https://avatars0.githubusercontent.com/u/4282013?v=4" width="100px;" alt="antonio"/><br /><sub><b>antonio</b></sub></a><br /><a href="https://github.com/the-couch/slater/issues?q=author%3AantonioOrtiz" title="Bug reports">🐛</a> <a href="https://github.com/the-couch/slater/commits?author=antonioOrtiz" title="Documentation">📖</a></td></tr><tr><td align="center"><a href="http://www.dana.kim"><img src="https://avatars2.githubusercontent.com/u/25087790?v=4" width="100px;" alt="dana kim"/><br /><sub><b>dana kim</b></sub></a><br /><a href="#ideas-softgradient" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="http://studiolye.se"><img src="https://avatars1.githubusercontent.com/u/14197736?v=4" width="100px;" alt="kotte"/><br /><sub><b>kotte</b></sub></a><br /><a href="https://github.com/the-couch/slater/commits?author=mrtamagotchi" title="Code">💻</a> <a href="#design-mrtamagotchi" title="Design">🎨</a> <a href="#ideas-mrtamagotchi" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT License © [The Couch](https://thecouch.nyc)
