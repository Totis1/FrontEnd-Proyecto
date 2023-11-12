const card = document.getElementById('card').content
const containerEve = document.getElementById('containerPuestos')
const fragment = document.createDocumentFragment()
const newProduct = document.getElementById('nuevoProducto').content


window.addEventListener('DOMContentLoaded', () => {
    const nE = 12
    let b = 3;
    containerEve.innerHTML = ''
    for (let index = 0; index < nE; index++) {
        const listProducts = card.getElementById('listaProductos')
        
        card.getElementById('listaProductos').innerHTML = ''

        for(let u = 0; u < b; u++){
            const cloneP = newProduct.cloneNode(true)
            fragment.appendChild(cloneP)
            listProducts.appendChild(fragment)
        }
        
        const clone = card.cloneNode(true)
        fragment.appendChild(clone)
        containerEve.appendChild(fragment)       
    }
    
})