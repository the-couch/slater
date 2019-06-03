import '../styles/main.css'
import '@/lib/select.js'
import lazim from 'lazim'
import app from '@/app.js'
import router from '@/router.js'
import { fetchCart } from '@/lib/cart.js'

/**
 * store binding fn
 */
const images = lazim()

/**
 * bind on page load
 */
images()

router.on('after', () => {
  app.unmount()
  app.mount()

  /**
   * bind new images
   */
  images()
})

/**
 * load any data that your site needs on fist load
 */
Promise.all([
  fetchCart()
]).then(([ cart ]) => {
  /**
   * add the cart data to the picoapp instance
   */
  app.hydrate({ cart })

  /**
   * mount any components defined on the page
   */
  app.mount()
})
