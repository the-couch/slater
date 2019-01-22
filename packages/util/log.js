const c = require('ansi-colors')

module.exports = function log (...args) {
  let arr = [
    c.gray(`@slater/cli`)
  ]

  if (typeof args[0] === 'function') {
    arr = arr.concat(args[0](c))
  } else {
    arr = arr.concat(args)
  }

  console.log.apply(this, arr)
}
