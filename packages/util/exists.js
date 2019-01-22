const fs = require('fs-extra')
const exit = require('exit')
const log = require('./log.js')
const join = require('./join.js')

module.exports = function exists (file, cb, required) {
  const path = join(file)

  if (fs.existsSync(path)) return cb(path)

  if (required) {
    log(c => ([
      c.red('error'),
      `${file} does not exist`
    ]))

    exit()
  }
}
