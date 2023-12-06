const tabla = document.getElementById('porAceptar')
const aprobados = document.getElementById('aprobados')
const reg = document.getElementById('reg').content
const fragment = document.createDocumentFragment()

const modificarPuesto = (data, val, id) => {
    const datos = {
        id_puesto: id,
        Nombre_puesto: data.Nombre_puesto,
        productos: data.productos,
        url_imagen: data.url_imagen,
        validacion: val
    }
    const datosJSON = JSON.stringify(datos)
    console.log(datosJSON)
    fetch("http://localhost:5000/actualizarpuesto", {
        method: "post",
        body: datosJSON,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => { 
        console.log(data)
    })
}

const btnAceptar = (data, e) => {
    const val = '102'
    const id = e.target.getAttribute("id-ven")
    modificarPuesto(data, val, id)
    console.log('btnAceptar')

    document.querySelector('[id-reg-ven="' + id + '"]').remove()
    data.validacion = val
    cargaDatos(data)
    document.querySelector('[id-ven="' + id + '"]').addEventListener('click', btnEliminar)
}

const btnRechazar = (data,e) => {
    const val = '103'
    const id = e.target.getAttribute("id-ven")
    console.log('btnRechazar')
    modificarPuesto(data, val, id)

    document.querySelector('[id-reg-ven="' + id + '"]').remove()
}

const cargaDatos = (dato) => {
    console.log(dato)
    reg.getElementById('regtr').setAttribute("id-reg-ven", dato.id_puesto)
    reg.getElementById('btn-aceptar').setAttribute("id-ven", dato.id_puesto)
    reg.getElementById('btn-rechazar').setAttribute("id-ven", dato.id_puesto)

    reg.getElementById('nombre').textContent = dato.Nombre_puesto
    reg.getElementById('alumno').textContent = dato.id_dueño

    let lis = ""


    const nProductos = Object.keys(dato.productos).length

    for (let i = 1; i <= nProductos; i++) {
        console.log(dato.productos[i].nombre)
        lis +=  '-' + dato.productos[i].nombre + '<br>'
    }


    reg.getElementById('lista').innerHTML = lis

    if ( dato.validacion === "102"  ) {

        const clone = reg.cloneNode(true)
        fragment.appendChild(clone)
        aprobados.appendChild(fragment)

        document.querySelectorAll('[id-ven="' + dato.id_puesto + '"]')[0].remove()
        document.querySelector('[id-ven="' + dato.id_puesto + '"]').textContent = 'Eliminar'

        return 
    }

    const clone = reg.cloneNode(true)
    fragment.appendChild(clone)
    tabla.appendChild(fragment)
}

const btnEliminar = (e) => {
    const id = e.target.getAttribute("id-ven")
    console.log("---s->" + id)


    document.querySelector('[id-reg-ven="' + id + '"]').remove()
}

const controlAcceso = () => {
    const ruta = document.referrer.split('/')
    const rutaRef = ruta[ruta.length - 1]
    if (rutaRef !== 'loginAdmin.html') {
        window.location.href = './loginAdmin.html'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    controlAcceso()

    fetch("http://localhost:5000/traerpuestos", {
        method: "get",
    })
    .then((response) => response.json())
    .then((data) => {


        data.data.forEach((dato) => {
            //console.log(dato.validacion)
            if ( dato.validacion !== "103" ) {
                cargaDatos(dato)
            }

        } )
        const btn_aceptar = document.querySelectorAll(".btn-aceptar")
        const btn_rechazar = document.querySelectorAll(".btn-rechazar")
        console.log(btn_aceptar)
        let contA = 0
        btn_rechazar.forEach((btn, i) => {
           
            if ( data.data[i].validacion === '101' ) {
                console.log("---->" + data.data[i].id_puesto)
                btn.addEventListener('click', btnRechazar.bind(null,data.data[i]))
                btn_aceptar[contA].addEventListener('click', btnAceptar.bind(null,data.data[i]))
                contA += 1
            }
            if ( data.data[i].validacion === '102' ) {
                console.log("@@@ " + data.data[i])
               btn.addEventListener('click', btnEliminar)
            }
            
        })


    })

    // const btnVerMas = document.querySelectorAll(".btn-aceptar")
    // //console.log(btnVerMas)

    // btnVerMas.forEach((btn) => {
    //     btn.addEventListener("click", btnAceptar)
    // })
    
})


