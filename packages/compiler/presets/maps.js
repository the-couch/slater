module.exports = (options = {}) => {
  return function createConfig ({ config, watch }) {
    if (watch) {
      config.devtool = 'inline-cheap-module-source-map'
    } else {
      config.devtool = false
    }
  }
}
