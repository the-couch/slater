export default wrapper => {
  const input = wrapper.getElementsByTagName('input')[0]

  function handleAddRemove (e) {
    e.target.value ? add() : remove()
  }

  function add () {
    wrapper.classList.add('has-value')
  }

  function remove () {
    wrapper.classList.remove('has-value')
  }

  input.addEventListener('change', handleAddRemove)
  input.addEventListener('blur', handleAddRemove)
  input.addEventListener('focus', add)

  return {
    unmount () {
      input.removeEventListener('change', handleAddRemove)
      input.removeEventListener('blur', handleAddRemove)
      input.removeEventListener('focus', add)
    }
  }
}
