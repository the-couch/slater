const cache = {}

export default function getProductJson (
  slug = window.location.pathname.split('/').reverse()[0],
  opts = {}
) {
  if (cache[slug] && !opts.refetch) return Promise.resolve(cache[slug])

  return fetch(window.location.origin + '/products/' + slug + '.json')
    .then(res => res.json())
    .then(({ product }) => {
      cache[slug] = product
      return product
    })
}
