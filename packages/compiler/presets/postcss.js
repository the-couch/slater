const ExtractCSS = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (options = {}) => {
  return function createConfig ({ config, watch }) {
    config.module.rules.push({
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        ExtractCSS.loader,
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          options: {
            plugins: [
              require('tailwindcss'),
              require('postcss-import'),
              require('postcss-nested'),
              require('postcss-preset-env')({
                stage: 0
              }),
              require('autoprefixer')
            ]
          }
        }
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
