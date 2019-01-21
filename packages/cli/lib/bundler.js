const path = require('path')
const rollup = require('rollup')
const exit = require('exit')
const c = require('ansi-colors')
const { log } = require('./util.js')

module.exports = function compiler (opts = {}) {
  const inputs = {
    input: opts.input,
    plugins: [
      require('@slater/rollup-plugin-postcss')({
        extensions: [ '.css' ],
        extract: true,
        minimize: true,
        sourceMap: false,
        plugins: [
          require('postcss-import')(),
          require('postcss-cssnext')({
            warnForDuplicates: false
          }),
          require('postcss-nested'),
          require('postcss-discard-comments')
        ]
      }),
      require('rollup-plugin-babel')({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [require('@babel/preset-env').default, {
            modules: false
          }],
          [require('@babel/preset-react').default, {
            pragma: opts.jsx
          }],
        ],
        plugins: [
          [require('fast-async'), {
            spec: true
          }],
          [require('@babel/plugin-proposal-object-rest-spread'), {
            useBuiltIns: true,
            loose: true
          }],
          require('@babel/plugin-proposal-class-properties')
        ]
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
        main: true,
        browser: true
      }),
      require('rollup-plugin-commonjs')(),
      require('rollup-plugin-alias')({
        resolve: [ '.js', '.css' ],
        ...opts.alias
      }),
      opts.compress && (
        require('rollup-plugin-uglify')({
          output: {
            preamble: opts.banner
          }
        })
      )
    ].filter(Boolean)
  }

  const outputs = {
    file: opts.output,
    format: 'iife',
    banner: opts.banner,
    sourcemap: opts.compress ? false : 'inline'
  }

  return {
    compile () {
      return rollup.rollup(inputs)
        .then(bundle => {
          bundle.write(outputs)
        })
        .catch(e => log(c.red('compilation'), e.message || e))
    },
    watch () {
      const bundle = rollup.watch({
        ...inputs,
        output: outputs
      })

      let listeners = {
        ERROR: [
          e => log(c.red('compilation'), e)
        ],
        FATAL: [
          e => log(c.red('compilation'), e)
        ]
      }

      bundle.on('event', ({ code, error }) => {
        listeners[code] && listeners[code].map(l => l(error))
      })

      return {
        ...bundle,
        start (cb) {
          listeners.START = (listeners.START || []).concat(cb)
          return this
        },
        end (cb) {
          listeners.END = (listeners.END || []).concat(cb)
          return this
        },
        error (cb) {
          listeners.ERROR = (listeners.ERROR || []).concat(cb)
          listeners.FATAL = (listeners.FATAL || []).concat(cb)
          return this
        }
      }
    }
  }
}
