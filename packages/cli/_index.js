#! /usr/bin/env node
'use strict'

const pkg = require('./package.json')
const path = require('path')
const fs = require('fs-extra')
const themekit = require('@slater/sync')
const c = require('ansi-colors')
const chokidar = require('chokidar')
const mm = require('micromatch')
const yaml = require('yaml').default
const onExit = require('exit-hook')
const exit = require('exit')
const spaghetti = require('@friendsof/spaghetti')
const { socket, closeServer } = require('./lib/socket.js')
const { log, join, resolve } = require('./lib/util.js')

log(c.gray(`v${pkg.version}`))

const {
  _: args,
  config: configFile = 'slater.config.js',
  env = 'development',
  debug,
  ...props
} = require('minimist')(process.argv.slice(2))

if (debug) require('inspector').open()

const watch = args[0] === 'watch'
const deploy = args[0] === 'deploy'
const build = args[0] === 'build' || (!watch && !deploy)
const gitignore = fs.readFileSync(join('.gitignore'))
const userConfig = fs.existsSync(join(configFile)) ? require(join(configFile)) : {}
const themeConfig = yaml.parse(fs.readFileSync(join('src/config.yml'), 'utf8'))[env]

let ignoredFiles = [
  '**/scripts/**',
  '**/styles/**',
  /DS_Store/
].concat(
  themeConfig.ignore_files || []
).concat(
  gitignore ? require('parse-gitignore')(gitignore) : []
)

const theme = themekit({
  password: themeConfig.password,
  store: themeConfig.store,
  theme_id: themeConfig.theme_id,
  ignore_files: ignoredFiles
})

const config = Object.assign({
  in: '/src/scripts/index.js',
  outDir:'/build/assets',
  watch,
  map: watch ? 'inline-cheap-source-map' : false,
  alias: {
    scripts: resolve('/src/scripts'),
    styles: resolve('/src/styles')
  },
  banner: watch ? `
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
  ` : false
}, userConfig)

config.in = join(config.in)
config.outDir = join(config.outDir)
config.filename = config.filename || path.basename(config.in, '.js')

const bundle = spaghetti(config)

function copyTheme () {
  return fs.copy(join('src'), join('build'), {
    filter: (src, dest) => {
      return !/scripts|styles/.test(src)
    }
  })
    .then(() => {
      log(c.green('copied theme to build/'))
    })
    .catch(e => {
      log(c.red('theme copy failed'), e.message || e)
    })
}

function watchFiles () {
  function match (p) {
    return mm.any(p, ignoredFiles)
  }

  /**
   * From /src dir
   */
  const watchSrc = chokidar.watch(join('/src'), {
    persistent: true,
    ignoreInitial: true,
    ignore: [
      '/scripts/**/*.js',
      '/styles/**/*.css'
    ]
  })
    .on('add', p => {
      if (match(p)) return

      const pathname = p.split('/src')[1]
      const dest = join('/build', pathname)

      fs.copy(p, dest)
        .catch(e => {
          log(
            c.red(`copying ${pathname} failed`),
            e.message || e || ''
          )
        })
    })
    .on('change', p => {
      if (match(p)) return

      const pathname = p.split('/src')[1]
      const dest = join('/build', pathname)

      fs.copy(p, dest)
        .catch(e => {
          log(
            c.red(`copying ${pathname} failed`),
            e.message || e || ''
          )
        })
    })
    .on('unlink', p => {
      if (match(p)) return

      const pathname = p.split('/src')[1]

      fs.remove(join('/build', pathname))
        .catch(e => {
          log(
            c.red(`removing ${pathname} failed`),
            e.message || e || ''
          )
        })
    })

  /**
   * From /build dir
   */
  const watchBuild = chokidar.watch(join('/build'), {
    ignore: /DS_Store/,
    persistent: true,
    ignoreInitial: true
  })
    .on('add', p => {
      const pathname = p.split('/build')[1]

      theme.upload(pathname, p)
        .then(() => socket.emit('refresh'))
    })
    .on('change', p => {
      const pathname = p.split('/build')[1]

      theme.upload(pathname, p)
        .then(() => socket.emit('refresh'))
    })
    .on('unlink', p => {
      const pathname = p.split('/build')[1]

      theme.remove(pathname)
        .then(() => socket.emit('refresh'))
    })

  return [
    watchSrc,
    watchBuild
  ]
}

if (watch) {
  copyTheme().then(() => {
    const watchers = watchFiles()

    onExit(() => {
      watchers.map(w => w.close())
      // socket.emit('close')
      closeServer()
    })

    bundle.watch()
      .end(stats => {
        log(c => ([
          c.green(`compiled`),
          `in ${stats.duration}ms`
        ]))
      })
      .error(err => {
        log(c => ([
          c.red(`compilation`),
          err ? err.message || err : ''
        ]))
      })
  })
} else if (build) {
  copyTheme().then(() => {
    bundle.build()
      .end(stats => {
        log(c => ([
          c.green(`compiled`),
          `in ${stats.duration}ms`
        ]))
        exit()
      })
      .error(err => {
        log(c => ([
          c.red(`compilation`),
          err ? err.message || err : ''
        ]))
        exit()
      })
  })
} else if (deploy) {
  copyTheme().then(() => {
    bundle.build()
      .end(stats => {
        log(c => ([
          c.green(`compiled`),
          `in ${stats.duration}ms`
        ]))

        theme.deploy('/build')
          .then(() => {
            log(c.green(`deployed to ${env} theme`))
            exit()
          })
          .catch(e => {
            log(c.red('deploy failed'), e)
            exit()
          })
      })
      .error(err => {
        log(c => ([
          c.red(`compilation`),
          err ? err.message || err : ''
        ]))
      })
  })
}

