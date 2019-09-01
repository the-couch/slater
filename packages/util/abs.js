const path = require('path')
const fixPathSeparators = require("./fixPathSeparators.js")

module.exports = function abs (...args) {
  const cwd = process.cwd()
  args = args.map(a => fixPathSeparators(a).replace(fixPathSeparators(cwd), ''))
  return fixPathSeparators(path.join(cwd, ...args))
}
