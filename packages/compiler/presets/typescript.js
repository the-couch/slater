module.exports = (options = {}) => {
  return function createConfig ({ config, watch }) {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      loader: require.resolve('ts-loader')
    })

    return config
  }
}