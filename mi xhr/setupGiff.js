/* eslint-disable no-undef */
export function setupGIff () {
  const busqueda = 'pibes'
  const cantida = '15'
  const api = 'FmwH69436DfQMYhIQsuNFmxhQfA5koFH'
  const tString = `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${busqueda}&limit=${cantida}&offset=0&rating=g&lang=es&bundle=messaging_non_clipsv`
  const gifP = document.getElementById('gif')
  let currentIndex = 0
  let gifs = []
  //   creando un loader
  const loader = document.createElement('p')
  loader.innerText = 'cargando img...'

  const updateGif = (index) => {
    const gifData = gifs[index]
    // creando gif

    const gif = document.createElement('img')
    gif.src = gifData.url
    gif.alt = gifData.alt
    gif.height = 100
    gif.width = 100

    // reseteado load y poniendo gif
    gifP.innerHTML = ''
    gifP.appendChild(loader)

    // usando onload
    setTimeout(() => {
      gifP.innerHTML = ''
      gifP.appendChild(gif)
    }, 1300)
  }

  const accionXhr = (responseText) => {
    const res = JSON.parse(responseText)
    gifs = res.data.map(e => { return { url: e.images.original.url, alt: e.slug } })
    updateGif(currentIndex)
  }
  const accionXhrDefault = () => {
    gifP.innerHTML = '<img src="./me-mini-card.svg" alt="no se encontro imagen"/>'
  }
  const fetchGifs = () => {
    const peticion = new XMLHttpRequest()
    peticion.addEventListener('readystatechange', function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) { accionXhr(this.responseText) }
      } else { accionXhrDefault() }
    })

    peticion.open('GET', tString)
    peticion.send()
  }

  fetchGifs()
  document.getElementById('btn-active').addEventListener('click', () => {
    currentIndex += 1 % gifs.length
    updateGif(currentIndex)
  })
}
