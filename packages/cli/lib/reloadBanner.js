module.exports = `
  ;(function (global) {
    try {
      var ls = global.localStorage

      var scrollPos = ls.getItem('slater-scroll')

      if (scrollPos) {
        global.scrollTo(0, scrollPos)
      }

      var socketio = document.createElement('script')

      socketio.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.slim.js'

      socketio.onload = function init () {
        var disconnected = false
        var socket = io('https://localhost:3000', {
          reconnectionAttempts: 3
        })
        socket.on('connect', () => console.log('@slater/cli connected'))
        socket.on('refresh', () => {
          ls.setItem('slater-scroll', global.scrollY)
          global.location.reload()
        })
        socket.on('disconnect', () => {
          disconnected = true
        })
        socket.on('reconnect_failed', e => {
          if (disconnected) return
          console.error("@slater/cli - Connection to the update server failed. Please visit https://localhost:3000 in your browser to trust the certificate. Then, refresh this page.")
        })
      }

      document.head.appendChild(socketio)
    } catch (e) {}
  })(this);
`
