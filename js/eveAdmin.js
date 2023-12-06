const tabla = document.getElementById('porAceptar')
const aprobados = document.getElementById('aprobados')
const reg = document.getElementById('reg').content
const fragment = document.createDocumentFragment()

const modificarEvento = (data, val, id) => {
    const datos = {
        id_evento: id,
        Nombre_eve: data.Nombre_eve,
        Ponente: data.Ponente,
        Descripcion: data.Descripcion,
        Registro: data.Registro,
        Fecha: data.Fecha,
        Lugar: data.Lugar,
        N_horas: data.N_horas,
        T_horas: data.T_horas,
        hora_evento: data.hora_evento,
        validacion: val,
        url_imagen: data.url_imagen
    }
    const datosJSON = JSON.stringify(datos)
    console.log(datosJSON)
    fetch("http://localhost:5000/actualizarevento", {
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
    const id = e.target.getAttribute("id-eve")
    modificarEvento(data, val, id)
    console.log('btnAceptar')

    document.querySelector('[id-reg-eve="' + id + '"]').remove()
    data.validacion = val
    cargaDatos(data)
    document.querySelector('[id-eve="' + id + '"]').addEventListener('click', btnEliminar)
}

const btnRechazar = (data,e) => {
    const val = '103'
    const id = e.target.getAttribute("id-eve")
    console.log('btnRechazar')
    modificarEvento(data, val, id)

    document.querySelector('[id-reg-eve="' + id + '"]').remove()
    
}


const btnEliminar = (e) => {
    const id = e.target.getAttribute("id-eve")
    console.log("---s->nnnnnnnnnnnnnnn" + id)

    const datos = {
        id_evento: id
    }

    const datosJSON = JSON.stringify(datos)

    fetch("http://localhost:5000/eliminarevento", {
        method: "post",
        body: datosJSON,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
    .then((data) => {  console.log(data) })

    document.querySelector('[id-reg-eve="' + id + '"]').remove()
}

const cargaDatos = (dato) => {
    //console.log(dato)
    reg.getElementById('regtr').setAttribute("id-reg-eve", dato.id_evento)
    reg.getElementById('btn-aceptar').setAttribute("id-eve", dato.id_evento)
    reg.getElementById('btn-rechazar').setAttribute("id-eve", dato.id_evento)

    reg.getElementById('nombre').textContent = dato.Nombre_eve
    reg.getElementById('ponente').textContent = dato.Ponente
    reg.getElementById('fecha').textContent = dato.Fecha
    reg.getElementById('lugar').textContent = dato.Lugar
    reg.getElementById('T_horas').textContent = dato.T_horas
    reg.getElementById('hora_evento').textContent = dato.hora_evento
    reg.getElementById('N_horas').textContent = dato.N_horas
    reg.getElementById('descripcion').textContent = dato.Descripcion

    if ( dato.validacion === "102"  ) {

        const clone = reg.cloneNode(true)
        fragment.appendChild(clone)
        aprobados.appendChild(fragment)

        document.querySelectorAll('[id-eve="' + dato.id_evento+ '"]')[0].remove()
        document.querySelector('[id-eve="' + dato.id_evento + '"]').textContent = 'Eliminar'

        return 
    }

    const clone = reg.cloneNode(true)
    fragment.appendChild(clone)
    tabla.appendChild(fragment)
    
    
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

    fetch("http://localhost:5000/traereventos", {
        method: "get",
    })
    .then((response) => response.json())
    .then((data) => {
        //console.log("---->" + data.data)


        data.data.forEach((dato) => {
            //console.log("@@@ " + dato)
            if ( dato.validacion !== "103" ) {
                cargaDatos(dato)
            }
            
        } )
        //console.log(data)
        const btn_aceptar = document.querySelectorAll(".btn-aceptar")
        const btn_rechazar = document.querySelectorAll(".btn-rechazar")
        console.log(btn_aceptar)
        let contA = 0
        btn_rechazar.forEach((btn, i) => {
           
            if ( data.data[i].validacion === '101' ) {
                console.log("---->" + data.data[i].id_evento)
                btn.addEventListener('click', btnRechazar.bind(null,data.data[i]))
                btn_aceptar[contA].addEventListener('click', btnAceptar.bind(null,data.data[i]))
                contA += 1
            }
            if ( data.data[i].validacion === '102' ) {
                console.log("@@@ " + data.data[i])
               btn.addEventListener('click', btnEliminar)
            }
            
            console.log("------------------------------------------")
        })
        
    })

    // const btnVerMas = document.querySelectorAll(".btn-aceptar")
    // //console.log(btnVerMas)

    // btnVerMas.forEach((btn) => {
    //     btn.addEventListener("click", btnAceptar)
    // })
    
})


