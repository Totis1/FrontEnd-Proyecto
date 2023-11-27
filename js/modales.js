const SignIn = document.getElementById("ModalSignIn");
const SignUp = document.getElementById("ModalSignUp");
const Agregar = document.getElementById("ModalAgregar");
const openSignIn = document.getElementById("btnAbrirLogin");
const openSignUp = document.getElementById("btnNuevaCuenta");
const openAgregar = document.getElementById("btnVentasAgregar");

openSignIn.addEventListener("click", () => {
    SignIn.showModal();
});

openSignUp.addEventListener("click", () => {
    SignUp.showModal();
    SignIn.close();
});

openAgregar.addEventListener("click", () => {
    console.log("hola");
    Agregar.showModal();
});
