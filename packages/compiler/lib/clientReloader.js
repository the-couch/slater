module.exports = function clientReloader (port) {
  return `
    (function (global) {
      try {
        const socketio = document.createElement('script')
        socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'
        socketio.onload = function init () {
          var disconnected = false
          var socket = io('http://localhost:${port}', {
            reconnectionAttempts: 3
          })
          socket.on('connect', () => console.log('rola connected'))
          socket.on('refresh', () => {
            global.location.reload()
          })
          socket.on('disconnect', () => {
            disconnected = true
          })
          socket.on('reconnect_failed', e => {
            if (disconnected) return
            console.error("rola - connection to server on :${port} failed")
          })
        }
        document.head.appendChild(socketio)
      } catch (e) {}
    })(this);
  `
}
