import { component } from 'picoapp'

export default component(({ node: outer, state }) => {
  const login = outer.querySelector('.js-login-dialog')
  const recover = outer.querySelector('.js-recover-dialog')
  const recoverLink = outer.querySelector('.js-recover-trigger')
  const cancelRecoverLink = outer.querySelector('.js-recover-cancel')

  /* eslint-disable */
  const recoverIsTarget = window.location.hash.match(/\#recover/) ? true : false
  /* eslint-enable */

  const successMessage = outer.querySelector('.js-recover-success') !== null

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
