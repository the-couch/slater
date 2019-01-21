const path = require('path')
const c = require('ansi-colors')
// const logger = require('log-update')

function log (...args) {
  if (typeof args[0] === 'function') {
    console.log(
      c.gray(`@slater/cli`),
      ...[].concat(args[0](c))
    )
  } else {
    console.log(
      c.gray(`@slater/cli`),
      ...args
    )
  }
}

function resolve (...args) {
  return path.resolve(process.cwd(), ...args)
}

function join (...args) {
  return path.join(process.cwd(), ...args)
}

module.exports = {
  log,
  resolve,
  join
}
