const c = require('ansi-colors')
const write = require('log-update')
const log = console.log

module.exports = function logger (scope) {
  let scoped = false
  return {
    colors: c,
    info (action, message, persist) {
      (persist ? write : log)([
        (!scoped || persist) && c.gray(scope),
        c.blue(action) + ' ' + (message || '')
      ].filter(Boolean).join(' '))
      scoped = true
    },
    error (message) {
      write([
        !scoped && c.gray(scope),
        c.red('error') + ' ' + (message || '')
      ].filter(Boolean).join(' '))
      scoped = true
    }
  }
}
