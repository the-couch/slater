import ProductSelector from 'slater/product-selector.js'

export default el => {
  const selector = ProductSelector()

  selector.on('update', variant => {
    console.log(variant)
  })
}
