import { component } from 'picoapp'
import { removeAddon, updateAddon } from '@/lib/cart.js'

export default component((node, ctx) => {
  const button = node.querySelector('.js-remove-item')
  const decrease = node.querySelector('.js-remove-single')
  const increase = node.querySelector('.js-add-single')
  const currentQty = node.querySelector('.js-single-quantity').innerHTML
  const id = node.getAttribute('data-id')

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
