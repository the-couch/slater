# slater
A Shopify theme development toolkit.

## Features
- bare-bones base theme
- JS and CSS compilation via Webpack and Babel
- live reloading
- easy config
- simple CLI

## Install
```bash
npm i -g slater
```

## Getting Started
To get set up out of the box with the slater base theme and default config
files, run:
```
slater init <project root>
```

### Configuration

### Development
The following will watch your source directory for file changes, as well
as compile any edits to your JS or CSS, before uploading the edited files to
your configured Shopify them.
```
slater watch
```

### Production
To compile and minify assets for production:
```
slater build
```

### Syncing Files
Upload one or more files or directories using `@slater/sync` under the hood.
```
slater sync build/snippets/nav.liquid
slater sync build/snippets/nav.liquid build/templates/index.liquid
slater sync build/snippets
```

### Deployment
```
slater build && slater sync build/
```

## Options
Any of the core commands can be combined with the following options.
- `--config <path>` - specify a path to a config.yml file
- `--theme <name>` - specify a named theme from your config.yml file
- `--slater <path>` - specify a path to your slater config file

## Live-reloading & HTTPS
`slater` uses an local SSL certification to correspond with Shopify's HTTPS
hosted themes. To take advantage of live-reloading, you need to create a
security exception for the `slater` cert (this is safe). To do this, load
[https://localhost:3000](https://localhost:3000) in your browser, and following
the instructions for adding an exception. If it works, you should see this in
your browser window:
```
slater successfully connected
```

## License
MIT License
© The Couch
