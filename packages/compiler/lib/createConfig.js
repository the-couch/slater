const path = require('path')
const clone = require('clone')
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin'); //https://webpack.js.org/plugins/mini-css-extract-plugin/

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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [require.resolve('@babel/preset-env')],
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: require.resolve('css-loader'), options: { url: false, importLoaders: 1 } },
          { loader: require.resolve('sass-loader') }
        ],
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

  wc.entry = {} //conf.entry

  //console.log(conf)

  conf.entry.forEach(entry => {
    //let obj = { [path.parse(entry).name]: path.resolve(cwd, entry) }
    let obj = { [path.basename(entry, '.js')]: path.resolve(cwd, entry) }
    wc.entry = { ...wc.entry, ...obj }
  });

 
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

  wc.plugins =  [
    new miniCssExtractPlugin({
      linkType: 'text/css',
      filename: "[name].css"
    })
  ]


  //console.log("---------------")
  //console.log(wc)
  //console.log("---------------")

  return wc
}
