import sliced from 'sliced'

window.slater = Object.assign(window.slater || {}, {
  qs (q, ctx) {
    return (ctx || document).querySelector(q)
  },
  qsa (q, ctx) {
    return sliced((ctx || document).querySelectorAll(q))
  },
  gebtn (q, ctx) {
    return sliced((ctx || document).getElementsByTagName(q))
  },
  gebi (q) {
    return document.getElementById(q)
  }
})
