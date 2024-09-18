import md5 from 'md5'
export function setupCard (element) {
  const nombreP = document.getElementById('body-title')
  const pP = document.getElementById('body-text')
  const fechaP = document.getElementById('body-fecha')
  const imgC = document.querySelector('.pep')

  const publicKey = '06ecc4304806e00634559027b307d1c2'
  const privateKey = '880fbbbad5ecbe1ece5e96835b292bb8fcaa896c'
  const ts = new Date().getDate()
  const hash = md5(ts + privateKey + publicKey).toString()

  const cargarLoader = () => {
    imgC.innerHTML = ''
    const loader = document.createElement('div')
    loader.innerHTML = `

  <p class="parrafo-c">cargando elemento<span class="punto-c">.</span><span class="punto-c">.</span><span class="punto-c">.</span></p>

  `
    imgC.append(loader)
  }
  cargarLoader()

  // actualizo el dom
  function updateDom (index, data) {
    imgC.innerHTML = ''
    const nombre = data.name || 'nombre no disponible'
    const description = data.description || 'descripcion no disponible'
    const fecha = data.modified ? data.modified.slice(0, 10) : 'fecha no disponible'
    const imgPath = `${data.thumbnail.path}.${data.thumbnail.extension}`

    const img = document.createElement('img')
    img.src = imgPath || ''
    img.height = 130
    img.width = 130

    nombreP.innerText = nombre
    pP.innerText = description
    fechaP.innerText = fecha
    imgC.appendChild(img)
  }

  function fetcherData () {
    // eslint-disable-next-line no-undef
    const cliente = new XMLHttpRequest()
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`

    cliente.addEventListener('readystatechange', function () {
    // eslint-disable-next-line no-undef
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const res = JSON.parse(this.responseText)
        const data = res.data.results
        if (data.length > 0) {
          let currentIndex = 0
          // primera muestra
          updateDom(currentIndex, data[currentIndex])
          // cambiar caundo hacen click
          document.getElementById('btn-active').addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % data.length
            cargarLoader()
            setTimeout(() => { updateDom(currentIndex, data[currentIndex]) }, 150)
          })
        } else {
          console.log('no ahi resultados')
        }
      // eslint-disable-next-line no-undef
      } else if (this.readyState === XMLHttpRequest.DONE) {
        console.log('no se pudo realizar la peticion', this.status)
      }
    })

    cliente.open('GET', apiUrl)
    cliente.send()
  }
  fetcherData()
}
