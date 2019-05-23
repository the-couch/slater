import { picoapp } from 'picoapp'

import slaterWelcome from '@/components/slater-welcome.js'

import header from '@/components/header.js'
import productSelection from '@/components/product-selection.js'
import cartDrawer from '@/components/cartDrawer.js'
import cartDrawerItem from '@/components/cartDrawerItem.js'
import accountLogin from '@/components/accountLogin.js'
import product from '@/components/product.js'
import productCounter from '@/components/product-counter.js'

const state = {
  cartOpen: false
}

const components = {
  slaterWelcome,
  accountLogin,
  header,
  productSelection,
  cartDrawer,
  cartDrawerItem,
  product,
  productCounter
}

export default picoapp(components, state)
