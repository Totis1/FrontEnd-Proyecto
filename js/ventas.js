const card = document.getElementById('card').content
const containerEve = document.getElementById('containerPuestos')
const fragment = document.createDocumentFragment()
const newProduct = document.getElementById('nuevoProducto').content

const slides = document.querySelectorAll('.ven-slide')
let nSlides = 0;

let idenLP = 0;
let pr_res = []
let pr_pre = []
let vmAbi = -1;


const verMas = (e) => {
    const id = e.target.getAttribute("idbtn")
    
    
    //Ya hay algo abierto
    if( vmAbi != -1 ){
        const lp = document.querySelector('[idlp="' + vmAbi + '"]')
        const lpc = document.querySelector('[idlpc="' + vmAbi + '"]')
        let num_productos;
        
        //lpc.style.height = lpc.offsetHeight + 'px';

        do{
            lp.removeChild(lp.lastChild)
            num_productos = lp.getElementsByClassName('ven-producto-precio').length
            console.log(num_productos)
        } while ( num_productos > 3)

        //lpc.style.height = 'auto'
    }

    //La lista desplegada es distinta o no había lista desplegada
    if( vmAbi != id ){
        const lp = document.querySelector('[idlp="' + id + '"]')
        console.log(pr_res[id])
        for( u=0; u<=pr_res[id].length; u+=1 ){
            newProduct.getElementById('producto').textContent = pr_res[id][u]
            newProduct.getElementById('precio').textContent = pr_pre[id][u]
            const clone = newProduct.cloneNode(true)
            fragment.appendChild(clone)
            lp.appendChild(fragment)
        }
        vmAbi = id;
    } else {
        vmAbi = -1;
    }
}

const desplegarPuestos = () => {
    
    
    fetch('http://localhost:5000/traerpuestos', {
        method: 'get'
    }).then(response => response.json()).then(data => {
    
        data.data.forEach((pue)=> {
            if (pue.validacion != "102" ) {
                console.log(pue.validacion)
                return
             }


            const listProducts = card.getElementById('listaProductos')
            const lpkey = Object.keys(pue.productos)
            card.getElementById('img-ven').setAttribute("src", pue.url_imagen)
            card.getElementById('nombre-puesto').textContent = pue.Nombre_puesto
            
            card.getElementById('listaProductos').innerHTML = ''

            let pres = []
            let ppre = []
            for(let u = 1; u <= lpkey.length; u++){
                if ( u<4 ) {
                    newProduct.getElementById('producto').textContent = pue.productos[u].nombre
                    newProduct.getElementById('precio').textContent = pue.productos[u].precio
                    const cloneP = newProduct.cloneNode(true)
                    fragment.appendChild(cloneP)
                    listProducts.appendChild(fragment)
                } else {
                    pres[u-4] = pue.productos[u].nombre
                    ppre[u-4] = pue.productos[u].precio
                }
            }

            pr_res[idenLP] = pres
            pr_pre[idenLP] = ppre

            card.getElementById('listaProductos').setAttribute("idlp", idenLP)
            card.getElementById('btnVerMas').setAttribute("idbtn", idenLP)
            card.getElementById('ven-card').setAttribute("idlpc", idenLP)
            idenLP += 1;  

             const clone = card.cloneNode(true)
             fragment.appendChild(clone)
             containerEve.appendChild(fragment)  
        })

        const btnVerMas = document.querySelectorAll('#btnVerMas')
        
        btnVerMas.forEach(btn => {
            btn.addEventListener('click', verMas)
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    showSlides()
    containerEve.innerHTML = ''
    desplegarPuestos()

    
  
})


const showSlides = () => {
    slides[ nSlides ].style.animation = 'suno 1s'
    
    setTimeout( () => {
        
        slides[ nSlides ].style.display = 'none'
        if ( nSlides === slides.length-1 ){
            nSlides = 0;
        } else {
            nSlides += 1;
        }

        
        slides[ nSlides ].style.animation = 'sdos 1s'
        slides[ nSlides ].style.display = 'block'
    }, 950)
}

setInterval( showSlides, 900*6 )

