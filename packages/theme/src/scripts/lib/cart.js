import fetch from 'unfetch'
import app from '@/app.js'

export function addVariant (variant, quantity) {
  const numAvailable = variant.inventory_policy === 'deny' && variant.inventory_management === 'shopify' ? (
    variant.inventory_quantity
  ) : null // null means they can add as many as they want

  return fetchCart().then(({ items }) => {
    const existing = items.filter(item => item.id === variant.id)[0] || {}
    const numRequested = (existing.quantity || 0) + quantity

    if (numAvailable !== null && numRequested > numAvailable) {
      const err = `There are only ${numAvailable} of that product available, requested ${numRequested}.`
      app.emit('error', err)
      throw new Error(err)
    } else {
      return addItemById(variant.id, quantity)
    }
  })
}

export function updateAddon (id, quantity) {
  return fetchCart().then(({ items }) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].variant_id === parseInt(id)) {
        return changeAddon(i + 1, quantity) // shopify cart is a 1-based index
      }
    }
  })
}

export function removeAddon (id) {
  return updateAddon(id, 0)
}

function changeAddon (line, quantity) {
  app.emit('cart:updating')

  return fetch('/cart/change.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ line, quantity })
  }).then(res => res.json()).then(cart => {
    app.hydrate({ cart: cart })
    app.emit('cart:updated', { cart: cart })
    return cart
  })
}

/**
 * Warning: this does not check available products first
 */
export function addItemById (id, quantity) {
  app.emit('cart:updating')

  return fetch('/cart/add.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, quantity })
  }).then(r => r.json()).then(item => {
    return fetchCart().then(cart => {
      app.hydrate({ cart: cart })
      app.emit('cart:updated')
      app.emit('cart:toggle', state => {
        return {
          cartOpen: !state.cartOpen
        }
      })
      // app.emit('updated', { item, cart })
      return { item, cart }
    })
  })
}

export function fetchCart () {
  return fetch('/cart.js', {
    method: 'GET',
    credentials: 'include'
  }).then(res => res.json())
}
