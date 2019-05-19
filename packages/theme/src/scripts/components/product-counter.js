import { component } from 'picoapp'

export default component((node, ctx) => {

  const decrease = node.querySelector('.js-counter-remove')
  const increase = node.querySelector('.js-counter-add')
  const quantity = node.querySelector('.js-counter-quantity')

  const min = parseInt(quantity.attributes.min.value)
  const max = parseInt(quantity.attributes.max.value)

  let count = parseInt(quantity.value)

  const set = (i) => {
    count = Math.max(min, Math.min(i, max || 10000))
    quantity.value = count
  }

  decrease.addEventListener('click', e => {
    e.preventDefault()
    set(--count)
  })

  increase.addEventListener('click', e => {
    e.preventDefault()
    set(++count)
  })
})
