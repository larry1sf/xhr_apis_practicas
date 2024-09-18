export const peticion = (method, url, callback) => {
  // eslint-disable-next-line no-undef
  const gif = new XMLHttpRequest()

  // const method ='GET'

  gif.open(method, url, true)
  gif.responseType =
'json'
  gif.onload = () => {
    if (gif.status === 200) {
      callback(null, gif.response)
    } else { callback(new Error(gif.status), null) }
  }

  gif.onerror = () => {
    callback(new Error('Error de coneccion!, verifica que la url o api exista.'), null)
  }
  gif.send()
}
