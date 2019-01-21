import { addVariant } from '../slater/cart.js'
import { component } from 'picoapp'
import wait from 'w2t'

export default component(({ node: el, state }) => {
  // const { selectedOrFirstAvailableVariant, product } = JSON.parse(el.querySelector('.js-product-json').innerHTML)
  // let currentVariant = product.variants.filter(v => v.id === selectedOrFirstAvailableVariant)[0]

  // const form = el.getElementsByTagName('form')[0]
  // const submit = form.querySelector('.js-submit-cart')
  // const quantity = form.querySelector('.js-quantity').value
  // console.log('subby', form)

  // form.addEventListener('submit', e => {
  //   e.preventDefault()
  //   submit.children[0].innerHTML = 'Adding..'
  //   wait(1000, [
  //     addVariant(currentVariant, quantity).then(({ item, cart }) => {
  //       submit.children[0].innerHTML = 'Add to Cart'
  //     }).catch(e => {
  //       alert(e)
  //     })
  //   ])
  // })
})

//
// export default el => {
//   const { selectedOrFirstAvailableVariant, product } = JSON.parse(el.querySelector('.js-product-json').innerHTML)
//
//   let currentVariant = product.variants.filter(v => v.id === selectedOrFirstAvailableVariant)[0]
//
//   /**
//    * Adding products to cart
//    */
//   const form = el.getElementsByTagName('form')[0]
//   const submit = form.querySelector('.js-submit-cart')
//   const quantity = form.querySelector('.js-quantity').value
//
//   form.addEventListener('submit', e => {
//     e.preventDefault()
//     console.log('add to cart')
//
//     submit.disabled = true
//     addVariant(currentVariant, quantity).then(({ item, cart }) => {
//       submit.disabled = false
//     }).catch(e => {
//       submit.disabled = false
//       /* eslint-disable */
//       alert(e)
//       /* eslint-enable */
//     })
//   })
// }
