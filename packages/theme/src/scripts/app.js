import { picoapp } from 'picoapp'

import slaterWelcome from '@/components/slater-welcome.js'

import header from '@/components/header.js'
import productSelection from '@/components/product-selection.js'
import cartDrawer from '@/components/cartDrawer.js'
import cartDrawerItem from '@/components/cartDrawerItem.js'
import productForm from '@/components/productForm.js'

const state = {
  cartOpen: false
}

const components = {
  slaterWelcome,

  header,
  productSelection,
  cartDrawer,
  cartDrawerItem,
  productForm
}

export default picoapp(components, state)
