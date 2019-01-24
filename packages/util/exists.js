const fs = require('fs-extra')
const exit = require('exit')
const logger = require('./logger.js')
const join = require('./join.js')

const log = logger('@slater/util')

module.exports = function exists (file, cb, required) {
  const path = join(file)

  if (fs.existsSync(path)) return cb(path)

  if (required) {
    log.error(`${file} does not exist`)
    exit()
  }
}
