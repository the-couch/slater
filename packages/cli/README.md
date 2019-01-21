# @slater/cli
Shopify theme development toolkit.

```
npm i @slater/cli --save-dev
```

# Usage
Place your entire theme within the `/src` directory, including a
Shopify-standard `config.yml`.

JS/CSS is compiled using [rollup](https://github.com/rollup/rollup) and
[postcss](https://github.com/postcss/postcss). This library expects a single
entrypoint at `/src/scripts/index.js`, so just import your modules and
stylesheets there and you should be good to go.

Example structure:
```bash
- package.json
- src/
  |- config.yml # standard issue Shopify
  |- scripts/
    |- index.js
  |- styles/
    |- main.css
  |- layout/
  |- templates/
  |- sections/
  |- snippets/
  |- locales/
  |- config/
  |- assets/
```

## watch
```
slater watch
```

## build
Build JavaScript and CSS, copy theme to `/build` directory.
```
slater build
```

## deploy
Build JavaScript and CSS, copy theme to `/build` directory, push to Shopify.
```
slater deploy
```

## Live-reloading & HTTPS
`slater` uses an local SSL certification to correspond with Shopify's HTTPS
hosted themes. To take advantage of live-reloading, you need to create a
security exception for the `slater` cert (this is safe). To do this, load
[https://localhost:3000](https://localhost:3000) in your browser, and following
the instructions for adding an exception. If it works, you should see this in
your browser window:
```
@slater/cli successfully connected
```

## Options
### `--env`
Specify a theme from `config.yml`. Defaults to `development`.
```
slater deploy --env=production
```

### Config File
`slater` also supports a `slater.config.js` as well, which supports all the same
options as
[@friendsof/spaghetti](https://github.com/the-couch/spaghetti#config).

```javascript
// slater.config.js
module.exports = {
  jsx: 'preact.h',
  map: 'inline-cheap-source-map',
  alias: {
    foo: './bar'
  }
}
```

## License
MIT License
(c) The Couch
