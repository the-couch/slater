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
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              sourceType: 'unambiguous',
              plugins: [
                require.resolve('@babel/plugin-syntax-object-rest-spread'),
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('@babel/plugin-transform-runtime'),
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

  wc.entry = (Array.isArray(conf.in) ? conf.in : [conf.in]).reduce((obj, entry) => {
    obj[path.basename(entry, '.js')] = path.resolve(cwd, entry);
    return obj;
  },{});

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
