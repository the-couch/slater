const path = require('path')
const clone = require('clone')
const webpack = require('webpack')

const cwd = process.cwd()

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
    [path.basename(conf.in, '.js')]: path.join(cwd, path.resolve(cwd, conf.in))
  }

  /**
   * merge output as an object,
   * or resolve a simple path
   */
  wc.output = Object.assign(
    wc.output,
    typeof conf.out === 'object' ? conf.out : {
      path: path.join(cwd, path.resolve(cwd, conf.out))
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
    .map(p => {
      const props = {
        config: wc,
        watch
      }

      try {
        typeof p === 'function' ? p(props) : (
          Array.isArray(p) ? (
            require(`../presets/${p[0]}.js`)(p[1])(props)
          ) : (
            require(`../presets/${p}.js`)()(props)
          )
        )
      } catch (e) {}
    })

  return wc
}
