const btnLogin = document.getElementById('btn-login')
const password = document.getElementById('password')
const correo = document.getElementById('correo')
const dcorreo = document.getElementById('div-correo')
const dpassword = document.getElementById('div-password')

btnLogin.addEventListener('click', e => {
    e.preventDefault()

    dpassword.style.border = '2px solid rgb(255, 255, 255)'
    dpassword.style.backgroundColor = 'white'
    dcorreo.style.border = '2px solid rgb(255, 255, 255)'
    dcorreo.style.backgroundColor = 'white'

    if (!password.value || !correo.value ) {
        if (!password.value) {
            dpassword.style.border = '2px solid red'
            dpassword.style.backgroundColor = 'rgb(255,220,220)'
        }
        if (!correo.value) {
            console.log("==> error")
            dcorreo.style.border = '2px solid red'
            dcorreo.style.backgroundColor = 'rgb(255,220,220)'
            
        }
        return
    }
    


    console.log("datos completos")
    const datos = {
        Correo: correo.value,
        Contraseña: password.value,
    }

    const datosJSON = JSON.stringify(datos)

    fetch("http://localhost:5000/loginadmin", {
        method: "post",
        body: datosJSON,
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        localStorage.setItem('id', data.id_usuario)

        if ( data.alert === "success") {
            window.parent.location.href = "../pages/eveAdmin.html"
        }

        if ( data.alert === "Contraseña Incorrecta") {
            dpassword.style.border = '2px solid red'
            dpassword.style.backgroundColor = 'rgb(255,220,220)'
        }

        if ( data.alert === "Correo Incorrecto") {
            dcorreo.style.border = '2px solid red'
            dcorreo.style.backgroundColor = 'rgb(255,220,220)'
        }
    })
})