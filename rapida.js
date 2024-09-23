async function peticion () {
  const prom = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const resJson = prom.json()
  console.log(resJson)
}
// peticion()
