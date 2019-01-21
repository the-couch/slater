import { removeAddon, updateAddon } from '../slater/cart.js'
import { component } from 'picoapp'

export default component(({ node: item, state }) => {
  const button = item.getElementsByTagName('button')[0]
  const decrease = item.querySelector('.js-remove-single')
  const increase = item.querySelector('.js-add-single')
  const currentQty = item.querySelector('.js-single-quantity').innerHTML
  const id = item.getAttribute('data-id')

  button.addEventListener('click', e => {
    e.preventDefault()
    removeAddon(id)
  })

  decrease.addEventListener('click', e => {
    e.preventDefault()
    updateAddon(id, parseInt(currentQty) - 1)
  })

  increase.addEventListener('click', e => {
    e.preventDefault()
    updateAddon(id, parseInt(currentQty) + 1)
  })
})
