let arr = [
  '/src/templates/index.liquid',
  'src/templates/index.liquid'
]

arr.map(a => {
  console.log(/[templates|snippets]/.test(a))
})
