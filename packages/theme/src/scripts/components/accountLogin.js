import { component } from 'picoapp'

export default component((node, ctx) => {
  const login = node.querySelector('.js-login-dialog')
  const recover = node.querySelector('.js-recover-dialog')
  const recoverLink = node.querySelector('.js-recover-trigger')
  const cancelRecoverLink = node.querySelector('.js-recover-cancel')

  /* eslint-disable */
  const recoverIsTarget = window.location.hash.match(/\#recover/) ? true : false
  /* eslint-enable */
  const successMessage = node.querySelector('.js-recover-success') !== null

  if (recoverIsTarget || successMessage) {
    login.style.display = 'none'
    recover.style.display = 'block'
  } else {
    login.style.display = 'block'
  }

  recoverLink.addEventListener('click', (e) => {
    e.preventDefault()
    login.style.display = 'none'
    recover.style.display = 'block'
  })

  cancelRecoverLink.addEventListener('click', (e) => {
    e.preventDefault()
    recover.style.display = 'none'
    login.style.display = 'block'
  })
})
