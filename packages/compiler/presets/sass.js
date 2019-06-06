const ExtractCSS = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (options = {}) => {
  return function createConfig ({ config, watch }) {
    config.module.rules.push({
      test: /\.(sa|sc)ss$/,
      exclude: /node_modules/,
      use: [
        ExtractCSS.loader,
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')(),
            ],
          }
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require('sass'),
          }
        },
      ]
    })

    config.plugins = config.plugins.concat([
      new ExtractCSS({
        filename: options.filename || '[name].css'
      }),
      watch && new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      })
    ].filter(Boolean))

    return config
  }
}
