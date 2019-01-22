const path = require('path')

module.exports = function join (...args) {
  return path.join(process.cwd(), ...args)
}
