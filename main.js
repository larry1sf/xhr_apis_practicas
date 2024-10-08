import './style.css'
import { setupCard } from './mi xhr/counter.js'
import { setupGIff } from './mi xhr/setupGiff.js'
document.querySelector('#app').innerHTML = `
  <div style="font-family: monospace;">
    <div>
        <h1>hola quiero presentar un gif</h1>
        <div id="gif" style="width:8rem;height:8rem;border-radius:10px;background:red; display:flex; align-items:center;justify-content:center; margin:0 auto"> 
        <img src="https://media2.giphy.com/media/QAt8XpGVF7Tee6URrL/200.gif?cid=8839de51buk0wkiqg3di75ze36s7yns4rdn4t2tjnd21x9nv&ep=v1_gifs_search&rid=200.gif&ct=g" alt="gif"/>
        </div>
    </div>
    <div>
        <h2>y una mini card con de este lado</h2>

        <div class="container-mini-c" style="padding: 10px;border: 1rem solid transparent; background-color: #464346;border-radius: 5px;box-shadow:0 0 8px #464346; width: 30rem;height: 10rem; display: flex; align-items: center; justify-content: space-around; margin:0 auto">
            <div class="pep" style="width: 30%; height: 8rem;">
              <img src="" alt="logo mio" style="height:100%;width:75%; object-fit:cover;">
            </div>
            <div class="body-mini-c" style="width: 70%;  text-align: center;padding: .7rem; color: #fff; display: flex;
            flex-direction: column;">
                <h3 id="body-title" style="margin:.5rem 0; font-size: xx-large;">Nombre en mayusculas</h3>
                <p id="body-text" >
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
                <i id="body-fecha" style="align-self: end;">Lorem, ipsum.</i>
            </div>
        </div>

        <button type="button" id="btn-active" style="margin: 10px auto; padding: 1rem; border-radius: 5px;">Click Aqui ♻</button>
    </div>
  </div>
`
setupGIff()
setupCard(document.querySelector('#btn-active'))

function myFetch (url) {
  return fetch(url).then((res) => res.json())
}

const baseUrl2 = 'https://jsonplaceholder.typicode.com'

async function getDataUser (id) {
  try {
    const user = await myFetch(`${baseUrl2}/users/${id}`)
    const post = await myFetch(`${baseUrl2}/posts?userId=${user.id}`)
    const comments = await myFetch(`${baseUrl2}/comments?postId=${post[0].id}`)
    console.log({ user, post, comments })
  } catch (err) {
    console.log({ err })
  }
}
getDataUser(6)
