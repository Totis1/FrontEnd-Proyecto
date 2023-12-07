const SignIn = document.getElementById("ModalSignIn");
const SignUp = document.getElementById("ModalSignUp");
const Agregar = document.getElementById("ModalAgregar");
const openSignIn = document.getElementById("btnAbrirLogin");
const openSignUp = document.getElementById("btnNuevaCuenta");
const openAgregar = document.getElementById("btnVentasAgregar");

const btnReg = document.getElementById("btnReg");
const nombre = document.getElementById("inpNombre");
const apellido = document.getElementById("inpApellido");
const correo = document.getElementById("inpCorreo");
const contrasena = document.getElementById("inpContrasena");
//const nombre = document,getElementById('')

const btnLogin = document.getElementById("btnIniciar");
const logUsuario = document.getElementById("logUsuario");
const logContrasena = document.getElementById("logContrasena");

const errorCorreo = document.getElementById("error-login-correo");
const errorContrasena = document.getElementById("error-login-contrasena");
const errorRegistro = document.getElementById("error-registro");

openSignIn.addEventListener("click", () => {
    SignIn.showModal();
});

openSignUp.addEventListener("click", () => {
    SignUp.showModal();
    SignIn.close();
});

openAgregar.addEventListener("click", () => {
    //console.log("test");
    Agregar.showModal();
});

// Registro usuario -------------------------
btnReg.addEventListener("click", (e) => {
    e.preventDefault();

    if (!nombre.value || !apellido.value || !correo.value || !contrasena.value) {
        console.log("==> error");
        errorRegistro.textContent = "Faltan Datos";
        return;
    }

    console.log(contrasena.value);
    const datos = {
        Nombre_usuario: nombre.value,
        Apellido_usuario: apellido.value,
        Correo: correo.value,
        Contraseña: contrasena.value,
        NUA: "123456",
        Rol: "usuario",
    };
    const datosJSON = JSON.stringify(datos);
    fetch("http://localhost:8080/insertarusuario", {
        method: "post",
        body: datosJSON,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (data.alert == "success") {
                SignUp.style.border = "4px solid green";

                setTimeout(() => {
                    SignUp.close();
                    SignIn.showModal();
                    SignUp.style.border = "4px solid transparent";
                }, 4000);
            }
        });
});

// Login ------------------------------------
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    if (!logUsuario.value || !logContrasena.value) {
        console.log("==> error");
        return;
    }
    console.log("datos completos");
    const datos = {
        Correo: logUsuario.value,
        Contraseña: logContrasena.value,
    };

    const datosJSON = JSON.stringify(datos);

    console.log(datosJSON);
    console.log(datos);

    fetch("http://localhost:8080/login", {
        method: "post",
        body: datosJSON,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("@@@ data -> ");
            console.log(data);

            if (data.alert == "success") {
                console.log("bienvenido");
                window.location.href = "";
            }

            if (data.alert == "Correo Incorrecto") {
                errorContrasena.innerHTML = "";
                errorCorreo.textContent = data.alert;
                return;
            }

            if (data.alert == "Contraseña Incorrecta") {
                errorContrasena.textContent = data.alert;
                errorCorreo.innerHTML = "";
                return;
            }
        });

    SignUp.close();
});

const closeDialogLogin = () => {
    errorContrasena.innerHTML = "";
    errorCorreo.innerHTML = "";
    SignIn.close();
};
