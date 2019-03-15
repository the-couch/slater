import { picoapp } from 'picoapp'

import header from '@/components/header.js'
import productSelection from '@/components/product-selection.js'
import cartDrawer from '@/components/cartDrawer.js'
import cartDrawerItem from '@/components/cartDrawerItem.js'

const state = {
  cartOpen: false
}

const components = {
  header,
  productSelection,
  cartDrawer,
  cartDrawerItem
}

export default picoapp(components, state)
