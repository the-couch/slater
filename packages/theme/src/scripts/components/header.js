// import { on, fetchCart } from '../slater/cart'
import { component } from 'picoapp'
// import Cart from './cart-drawer.js'

export default component(({ node: header, state, actions }) => {
  const cartCount = header.querySelector('.js-cart-count')
  const cartToggles = header.querySelectorAll('.js-cart-drawer-toggle')
  cartCount.innerHTML = state.cart.items.length >= 1 ? state.cart.item_count : null

  for (let toggle of cartToggles) {
    toggle.addEventListener('click', e => {
      console.log('yo click', state)
      e.preventDefault()
      actions.toggleCart(true)
      console.log('yo click', state)
    })
  }

  return {
    onStateChange (state) {
      cartCount.innerHTML = state.cart.item_count
    }
  }
  //   const cartCount = header.querySelector('.js-cart-count')
  //   const cart = fetchCart()
  //   cart.then(res => {
  //      /* eslint-disable */
  //     res ? cartCount.innerHTML = res.item_count : null
  //     /* eslint-enable */
  //   })
  // on('updated', ({ cart }) => {
  //   cartCount.innerHTML = cart.item_count
  // })
  // on('addon', ({ cart }) => {
  //   cartCount.innerHTML = cart.item_count
  // })
  //   /**
  //  // * Cart opening
  //  // */
  //   const cartToggles = header.querySelectorAll('.js-cart-drawer-toggle')
  //   for (let toggle of cartToggles) {
  //     toggle.addEventListener('click', e => {
  //       console.log('clicked?')
  //       e.preventDefault()
  //       Cart.open()
  //       // const cartDrawer = scripts.cache.get('cart-drawer')
  //       // cartDrawer.open()
  //     })
  //   }
})
