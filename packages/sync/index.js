const fs = require('fs-extra')
const path = require('path')
const assert = require('assert')
const exit = require('exit')
const c = require('ansi-colors')
const wait = require('w2t')
const fetch = require('node-fetch')
const readdir = require('recursive-readdir')
const yaml = require('yaml').default

const {
  logger,
  abs,
  sanitize
} = require('@slater/util')

const pkg = require('./package.json')

const log = logger('@slater/sync')

module.exports = function init (config) {
  if (!config.id) {
    log.error(`theme id is missing from config`)
    exit()
  }

  if (!config.password) {
    log.error(`theme API password is missing from config`)
    exit()
  }

  if (!config.store) {
    log.error(`store url is missing from config`)
    exit()
  }

  /**
   * filled on each sync request, emptied when successful
   */
  let queue = []

  function createProgressCallback (cb) {
    return total => remaining => cb && cb(total, remaining)
  }

  function api (method, body) {
    return fetch(`https://${config.store}/admin/themes/${config.id}/assets.json`, {
      method,
      headers: {
        'X-Shopify-Access-Token': config.password,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  function upload ({ key, file }) {
    const encoded = Buffer.from(fs.readFileSync(file), 'utf-8').toString('base64')

    return api('PUT', {
      asset: {
        key,
        attachment: encoded
      }
    })
      .then(res => res ? res.json() : {})
      .then(({ errors, asset }) => {
        if (errors) {
          throw {
            key,
            errors
          }
        }

        return {
          key,
          asset
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
          throw {
            key,
            errors
          }
        }

        return {
          key,
          asset
        }
      })
  }

  function enqueue (action, cb) {
    return new Promise((res, rej) => {
      ;(function push (p) {
        if (!p) res()

        wait(500, [
          action(p)
        ])
          .then(() => {
            cb && cb(queue.length)
            if (queue.length) return push(queue.pop())
            res()
          })
          .catch(e => {
            cb && cb(queue.length)
            if (queue.length) return push(queue.pop())
            rej(e)
          })
      })(queue.pop())
    })
  }

  function sync (paths = [], cb) {
    paths = [].concat(paths)
    paths = paths.length ? paths : ['.']
    paths = paths.map(p => abs(p))

    const deploy = fs.lstatSync(paths[0]).isDirectory()
    const ignored = config.ignore

    return new Promise((res, rej) => {
      if (deploy) {
        readdir(abs(paths[0]), ignored, (e, files) => {
          if (e) {
            log.error(e.message || e)
            exit()
          }

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

              log.error(
                [
                  `plz only specify one theme directory\n`
                ].concat(dirs.map(dir => (
                  `  ${log.colors.gray('>')} ${dir}/\n`
                ))).join('')
              )

              exit()
            }
            return _.concat(f.key)
          }, [])

          if (!queue.length) res()

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

        if (!queue.length) {
          log.info('syncing', `nothing was synced`)
          res()
          return
        }

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

  return {
    sync,
    unsync,
    config
  }
}
