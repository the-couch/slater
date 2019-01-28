const path = require('path')

module.exports = function abs (...args) {
  return path.resolve(process.cwd(), ...args)
}
