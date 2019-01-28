const path = require('path')

module.exports = function abs (...args) {
  const cwd = process.cwd()
  args = args.map(a => a.replace(cwd, ''))
  return path.join(cwd, ...args)
}
