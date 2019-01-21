export default div => {
  const theme = div.getAttribute('data-theme')
  const header = document.getElementById('header')

  if (!/light|dark/.test(theme)) {
    return console.warn(`Header theme must be either 'light' or 'dark', not ${theme}.`)
  }

  if (theme === 'light') {
    header.classList.add('header--light')
  } else {
    header.classList.remove('header--light')
  }
}
