import operator from 'operator'
import app from './app.js'
import { fetchCart } from './slater/cart'
import './slater/util/select.js'

import '../styles/main.css'

function transition () {
  return new Promise(res => {
    document.body.classList.add('is-transitioning')
    setTimeout(res, 600)
    setTimeout(() => document.body.classList.remove('is-transitioning'), 800)
  })
}

const router = operator('#root', [
  transition
])

router.on('before', state => {
  return Promise.all([
    app.unmount()
  ])
})

router.on('after', ({ title, pathname }) => {
  document.title = title
  window.history.pushState({}, '', pathname)
})

document.addEventListener('DOMContentLoaded', e => {
  Promise.all([
    fetchCart()
  ]).then(([ cart ]) => {
    app.hydrate({ cart: cart })
    app.mount()
  })
})

console.groupCollapsed('Slater credits 🍝  taco')
console.log('Development by The Couch https://thecouch.nyc')
console.groupEnd()
