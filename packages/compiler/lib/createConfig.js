const path = require('path')
const clone = require('clone')
const webpack = require('webpack')
const match = require('matched')
const clientReloader = require('./clientReloader.js')

const cwd = process.cwd()

function hasGlob (input) {
  return [].concat(input).reduce((_, str) => {
    if (/\*+/g.test(str)) return true
    return _
  }, false)
}

const baseConfig = {
  output: {
    filename: '[name].js'
  },
  mode: 'development',
  target: 'web',
  performance: { hints: false },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('@babel/plugin-syntax-object-rest-spread'),
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('fast-async')
              ],
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react')
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': process.cwd()
    }
  },
  plugins: []
}

module.exports = function createConfig (conf, watch) {
  const wc = clone(baseConfig)

  wc.entry = {
    [path.basename(conf.in, '.js')]: path.resolve(cwd, conf.in)
  }

  /**
   * merge output as an object,
   * or resolve a simple path
   */
  wc.output = Object.assign(
    wc.output,
    typeof conf.out === 'object' ? conf.out : {
      path: path.resolve(cwd, conf.out)
    }
  )

  wc.resolve.alias = Object.assign(wc.resolve.alias, conf.alias || {})

  wc.plugins = wc.plugins.concat([
    new webpack.DefinePlugin(conf.env || {}),
    conf.banner && new webpack.BannerPlugin({
      banner: conf.banner,
      raw: true,
      entryOnly: true,
      exclude: /\.(sa|sc|c)ss$/
    })
  ].filter(Boolean))

  ;[].concat(conf.presets || [])
    .map(p => p({
      config: wc,
      watch
    }))

  return wc
}
