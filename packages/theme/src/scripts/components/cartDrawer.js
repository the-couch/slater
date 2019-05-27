import { component } from 'picoapp'
import { getSizedImageUrl, imageSize } from '@/lib/images.js'
import { formatMoney } from '@/lib/currency.js'
import app from '@/app.js'

const X = `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentcolor" stroke-width="3" style="display:inline-block;vertical-align:middle;overflow:visible;"><path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path><path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path></svg>`

function createItem ({
  variant_id: id,
  product_title: title,
  line_price: price,
  variant_title: color,
  image,
  url,
  quantity,
  ...item
}) {
  const img = image ? getSizedImageUrl(
    image.replace('.' + imageSize(image), ''), '200x' // TODO hacky af
  ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'

  return `
<div class='cart-drawer__item' data-component='cartDrawerItem' data-id=${id}>
  <div class='f aic'>
    <a href='${url}'>
      <img src='${img}' />
    </a>
    <div class='__content pl1 f y ais jcb'>
      <div>
        <a href='${url}' class='serif mv0 p mv0'>${title}</a>
        <div class='small sans track mt025 mb05 book'>${formatMoney(price)}</div>
        <div class='f aic'>
          <div class='cart-quantity js-remove-single px05'>-</div>
          <div class='js-single-quantity'>${quantity}</div>
          <div class='cart-quantity js-add-single px05'>+</div>
        </div>
        ${color ? `<div class='xsmall sans caps track cm mv025 book'>${color.split(':')[0]}</div>` : ``}
      </div>

      <button class='button--reset js-remove-item'>${X}</button>
    </div>
  </div>
</div>
`
}

function renderItems (items) {
  return items.length > 0 ? (
    items.reduce((markup, item) => {
      markup += createItem(item)
      return markup
    }, '')
  ) : (
    `<div class='pv1'><p class='pv1 mv05 sans small cm i ac'>Your cart is empty</p></div>`
  )
}

export default component((node, ctx) => {
  const overlay = node.querySelector('.js-overlay')
  const closeButton = node.querySelector('.js-close')
  const subtotal = node.querySelector('.js-subtotal')
  const itemsRoot = node.querySelector('.js-items')
  const loading = itemsRoot.innerHTML

  const render = (cart) => {
    itemsRoot.innerHTML = renderItems(cart.items)
    subtotal.innerHTML = formatMoney(cart.total_price)
  }

  const open = (cart) => {
    node.classList.add('is-active')
    itemsRoot.innerHTML = loading
    setTimeout(() => {
      node.classList.add('is-visible')
      setTimeout(render(cart), 10)
      app.mount()
    }, 50)
  }

  const close = () => {
    node.classList.remove('is-visible')
    setTimeout(() => {
      node.classList.remove('is-active')
      app.hydrate({cartOpen: false})
    }, 400)
  }

  render(ctx.getState().cart)

  overlay.addEventListener('click', close)
  closeButton.addEventListener('click', close)

  ctx.on('cart:toggle', ({ cart, cartOpen }) => {
    cartOpen && open(cart)
  })
  ctx.on('cart:updated', () => {
    render(ctx.getState().cart)
    app.mount()
  })
})
