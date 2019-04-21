import { component } from 'picoapp'

export default component((node, ctx) => {
  const json = JSON.parse(node.querySelector('.js-product-json').innerHTML)

  console.log(json)
})
