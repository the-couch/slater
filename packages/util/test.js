const write = require('log-update')

function logger (view) {
  return function render (data) {
    write(view(data))
  }
}

const log = logger(data => `
  hello ${data.name}
`)

log({ name: 'eric' })

const deploy = logger(data => `
deploying - ${data.seconds} remaining
`)

let s = 0

setInterval(() => deploy({ seconds: s++ }), 1000)
