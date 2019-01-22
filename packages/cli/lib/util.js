const path = require('path')
const fs = require('fs-extra')
const c = require('ansi-colors')
const exit = require('exit')
const mm = require('micromatch')

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

function exists (p, cb, required) {
  const path = join(p)
  if (fs.existsSync(path)) return cb(path)
  if (required) {
    log(c => ([
      c.red('error'),
      `${p} does not exist`
    ]))
    exit()
  }
}

function match (p, ignore) {
  return mm.any(p, ignore)
}

module.exports = {
  log,
  resolve,
  join,
  exists,
  match
}
