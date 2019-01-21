import { addVariant } from '../slater/cart.js'
import { component } from 'picoapp'
import wait from 'w2t'
import radio from '../slater/radio.js'
import options from '../slater/options.js'
import getProductJson from '../slater/getProductJson.js'

export default component(({ node }) => {
  const opts = options(node)

  // cache
  getProductJson()

  opts.onUpdate(state => {
    getProductJson().then(json => {
      const variant = json.variants.filter(v => v.id == state.id)[0]
    })
  })
})
