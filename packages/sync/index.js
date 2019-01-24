const fs = require('fs-extra')
const path = require('path')
const assert = require('assert')
const exit = require('exit')
const c = require('ansi-colors')
const wait = require('w2t')
const readdir = require('recursive-readdir')
const yaml = require('yaml').default

const {
  logger,
  resolve,
  exists
} = require('@slater/util')

const pkg = require('./package.json')

const log = logger('@slater/sync')

module.exports = function init (options) {
  const gitignore = exists('.gitignore', path => fs.readFileSync(path, 'utf8'))
  const themeconfig = yaml.parse(exists(options.config || './config.yml', path => (
    fs.readFileSync(path, 'utf8')
  ), true))[options.theme || 'development']

  /**
   * exit if the theme info isn't configured
   */
  if (!themeconfig) {
    log.error(`hmmmm can't seem to find your ${options.theme} theme`)
    exit()
  }

  /**
   * combine ignored files
   */
  const ignored = ['**/scripts/**', '**/styles/**', 'DS_Store']
    .concat(themeconfig.ignore_files || [])
    .concat(gitignore ? require('parse-gitignore')(gitignore) : [])

  themeconfig.ignore_files = ignored

  const {
    password,
    theme_id,
    store,
    ignore_files = []
  } = themeconfig

  /**
   * filled on each sync request, emptied when successful
   */
  let queue = []

  function createProgressCallback (cb) {
    return total => remaining => cb && cb(total, remaining)
  }

  function api (method, body) {
    return fetch(`https://${store}/admin/themes/${theme_id}/assets.json`, {
      method,
      headers: {
        'X-Shopify-Access-Token': password,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  function upload ({ key, file }) {
    const encoded = Buffer.from(fs.readFileSync(file), 'utf-8').toString('base64')

    return Promise.resolve(true)

    return api('PUT', {
      asset: {
        key,
        attachment: encoded
      }
    })
      .then(res => res ? res.json() : {})
      .then(({ errors, asset }) => {
        if (errors) {
          throw errors
        }

        return {
          key,
          errors
        }
      })
      .catch(e => {
        return {
          errors: e
        }
      })
  }

  function remove ({ key }) {
    return api('DELETE', {
      asset: { key }
    })
      .then(res => res ? res.json() : {})
      .then(({ errors, asset }) => {
        if (errors) {
          throw errors
        }

        return {
          key,
          errors
        }
      })
      .catch(e => {
        return {
          errors: e
        }
      })
  }

  function enqueue (action, cb) {
    return new Promise((res, rej) => {
      ;(function push (p) {
        wait(500, [
          action(p)
        ])
          .then(() => {
            cb && cb(queue.length)
            if (queue.length) return push(queue.pop())
            res()
          })
          .catch(rej)
      })(queue.pop())
    })
  }

  function sync (paths = [], cb) {
    paths = [].concat(paths)
    paths = paths.length ? paths : ['.']

    const deploy = fs.lstatSync(paths[0]).isDirectory()
    const ignored = ignore_files.concat([
      '*.yml',
      '.DS_Store',
      'node_modules'
    ])

    return new Promise((res, rej) => {
      if (deploy) {
        readdir(resolve(paths[0]), ignored, (err, files) => {
          queue = files.map(file => ({
            key: sanitize(file),
            file
          })).filter(f => f.key)

          queue.reduce((_, f) => {
            if (_.indexOf(f.key) > -1) {
              const dirs = files
                .map(f => f.replace(process.cwd(), ''))
                .reduce((_, f) => {
                  const frag = f.split('/')[1]
                  if (_.indexOf(frag) > -1) return _
                  return _.concat(frag)
                }, [])
                .filter(f => fs.lstatSync(f).isDirectory())

              log.error([
                  `plz only specify one theme directory\n`,
                ].concat(dirs.map(dir => (
                  `  ${log.colors.gray('>')} ${dir}/\n`
                ))).join('')
              )

              exit()
            }
            return _.concat(f.key)
          }, [])

          res(enqueue(
            upload,
            createProgressCallback(cb)(queue.length)
          ))
        })
      } else {
        queue = paths.map(file => ({
          key: sanitize(file),
          file
        })).filter(f => f.key)

        res(enqueue(
          upload,
          createProgressCallback(cb)(queue.length)
        ))
      }
    })
  }

  function unsync (paths = [], cb) {
    queue = [].concat(paths).map(p => ({
      key: sanitize(p)
    })).filter(f => f.key)

    return Promise.resolve(enqueue(
      remove,
      createProgressCallback(cb)(queue.length)
    ))
  }

  function sanitize (p) {
    if (!p) return null
    if (/^\//.test(p)) {
      return sanitize(p.substr(1))
    }
    if (!/^(layout|templates|sections|snippets|config|locales|assets)/.test(p)) {
      return sanitize(p.split('/').slice(1).join('/'))
    }
    return p
  }

  return {
    sync,
    unsync
  }
}
