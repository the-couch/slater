import { component } from 'picoapp'

export default component((node, ctx) => {
  console.log('slater-welcome mounted')

  return node => {
    console.log('slater-welcome unmounted')
  }
})
