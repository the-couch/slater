const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const createConfig = require('./lib/createConfig.js')
const formatStats = require('./lib/formatStats.js')
const clientReloader = require('./lib/clientReloader.js')

module.exports = conf => {
  let compiler
  let server
  let socket

  const events = {}

  function emit (ev, ...data) {
    return (events[ev] || []).map(fn => fn(...data))
  }

  function on (ev, fn) {
    events[ev] = (events[ev] || []).concat(fn)
    return () => events[ev].slice(events[ev].indexOf(fn), 1)
  }

  function closeServer () {
    server.close()
    socket.close()

    emit('close')
  }

  return {
    on,
    close () {
      closeServer()
      return Promise.resolve(compiler ? new Promise(r => compiler.close(r)) : null)
    },
    build (options = {}) {
      emit('build')

      const config = createConfig(conf, false)
      config.mode = 'production'

      return new Promise((res, rej) => {
        webpack(config).run((e, stats) => {
          if (e) {
            emit('error', e)
            rej(e)
            return
          }

          const s = formatStats(stats)

          if (s.errors && s.errors.length) emit('error', s.errors)
          if (s.warnings && s.warnings.length) emit('warn', s.warnings)

          emit('stats', s)
          emit('done', s)

          res(s)
        })
      })
    },
    watch (options = {}) {
      emit('watch')

      let port = 4000

      conf.banner = conf.banner || ''
      conf.banner += clientReloader(port)

      const config = createConfig(conf, true)

      server = require('https').createServer({
        key: fs.readFileSync(path.join(__dirname, '/lib/cert/server.key')),
        cert: fs.readFileSync(path.join(__dirname, '/lib/cert/server.crt'))
      }, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('slater running')
        res.end()
      }).listen(port)

      socket = require('socket.io')(server, {
        serveClient: false
      })

      compiler = webpack(config).watch(options, (e, stats) => {
        if (e) return emit('error', e)

        const s = formatStats(stats)

        if (s.errors && s.errors.length) emit('error', s.errors)
        if (s.warnings && s.warnings.length) emit('warn', s.warnings)

        emit('stats', s)

        socket.emit('refresh')
      })

      return {
        emit (ev) {
          socket.emit(ev)
        }
      }
    }
  }
}
