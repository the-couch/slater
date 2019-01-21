import picoapp from 'picoapp'

import header from './components/header.js'
import product from './components/product.js'
import productSelection from './components/product-selection.js'
import cartDrawer from './components/cartDrawer.js'
import cartDrawerItem from './components/cartDrawerItem.js'
import accountLogin from './components/accountLogin.js'

const state = {
  cartOpen: false
}

const actions = {
  toggleCart: open => state => ({ cartOpen: !state.cartOpen })
}

const components = {
  header,
  product,
  productSelection,
  cartDrawer,
  cartDrawerItem,
  accountLogin
}

export default picoapp(components, state, actions)
