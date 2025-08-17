export default (message = 'undefined') => {
  console.log('~Error:'.red.bold)
  console.log(` |> ${message}`.dim.bold)
  process.exit(0)
}
