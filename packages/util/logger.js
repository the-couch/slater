const c = require('ansi-colors')
const write = require('log-update')
const progress = require('./progress')
const log = console.log

module.exports = function logger (scope) {
  return {
    colors: c,
    log (message, persist) {
      (persist ? write : log)([
        persist && c.gray(scope),
        (message || '')
      ].filter(Boolean).join(' '))
    },
    info (action, message, persist) {
      (persist ? write : log)([
        persist && c.gray(scope),
        c.blue(action) + ' ' + (message || '')
      ].filter(Boolean).join(' '))
    },
    warn (action, message, persist) {
      (persist ? write : log)([
        persist && c.gray(scope),
        c.yellow(action) + ' ' + (message || '')
      ].filter(Boolean).join(' '))
    },
    error (message) {
      write([
        c.red('error') + ' ' + (message || '')
      ].filter(Boolean).join(' '))
    },
    progress (theme, action, percentage) {
      write([
        c.gray(scope),
        c.blue(action + '\n\n'),
        progress[theme](percentage)
      ].filter(Boolean).join(' '))
    }
  }
}
