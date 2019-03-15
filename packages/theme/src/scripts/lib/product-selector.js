import mitt from 'mitt'

export default function ProductSelector (
  config = {
    main: '[data-product-select]',
    options: '[data-single-option-selector]',
    data: '[data-product-json]'
  }
) {
  const ev = mitt()

  const main = document.querySelector(config.main)
  const options = [].slice.call(
    document.querySelectorAll(config.options)
  )
  const data = JSON.parse(
    document.querySelector(config.data).innerHTML
  )

  options.forEach(opt => opt.addEventListener('change', e => {
    const val = options.reduce((res, opt, i) => {
      res += i < options.length - 1 ? opt.value + ' / ' : opt.value
      return res
    }, '')

    for (let i = 0; i < main.options.length; i++) {
      if (main.options[i].text === val) {
        main.selectedIndex = i
        break
      }
    }

    ev.emit('update', data.variants.filter(v => v.title === val)[0])
  }))

  return {
    on: ev.on,
    destroy () {
      options.forEach(opt => {
        // opt.removeEventListener('change', updateSelect)
      })
    }
  }
}
