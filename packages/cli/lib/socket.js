const fs = require('fs-extra')

const server = require('https').createServer({
  key: fs.readFileSync(__dirname + '/cert/server.key'),
  cert: fs.readFileSync(__dirname + '/cert/server.crt')
}, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.write('@slater/cli successfully connected')
  res.end()
}).listen(3000)

const socket = require('socket.io')(server, {
  serveClient: false
})

module.exports = {
  socket,
  closeServer () {
    server.close()
  }
}
