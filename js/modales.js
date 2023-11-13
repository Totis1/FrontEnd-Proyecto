const SignIn = document.getElementById('SignIn');
const SignUp = document.getElementById('SignUp');
const showSignIn = document.getElementById('btnAbrirLogin');
const OpenSignUp = document.getElementById('btnNuevaCuenta');

showSignIn.addEventListener('click', () => {
  SignIn.showModal();
});

OpenSignUp.addEventListener('click', () => {
  SignUp.showModal();
  SignIn.close();
});
