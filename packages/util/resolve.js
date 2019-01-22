const path = require('path')

module.exports = function resolve (...args) {
  return path.resolve(process.cwd(), ...args)
}
