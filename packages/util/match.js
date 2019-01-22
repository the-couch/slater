const mm = require('micromatch')

module.exports = function match (path, ignoredArray = []) {
  return mm.any(path, ignoredArray)
}
