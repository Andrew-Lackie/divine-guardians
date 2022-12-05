// select items
let loginToggle = document.getElementById('login');
let registerToggle = document.getElementById('register');
let toggleBtn = document.getElementById('btn');
let password = document.querySelectorAll('.password');
let icon = document.querySelectorAll('.icon');

// buttons
const loginToggleBtn = document.getElementById('login-toggle-btn');
const registerToggleBtn = document.getElementById('register-toggle-btn');
const showPass = document.querySelectorAll('.show-password');
const formBox = document.querySelector('.form-box');
/*const loginStore = localStorage.getItem('login');*/
/*const joinStore = localStorage.getItem('register');*/
// event listeners

/*window.addEventListener('load', (event) => {*/
/*if (loginStore == 1) {*/
/*console.log(loginStore);*/
/*loginToggle.style.left = '50px';*/
/*registerToggle.style.left = '-450px';*/
/*toggleBtn.style.left = '0';*/
/*localStorage.removeItem('login');*/
/*} else if (joinStore == 1) {*/
/*console.log(joinStore);*/
/*loginToggle.style.left = '50px';*/
/*registerToggle.style.left = '450px';*/
/*toggleBtn.style.left = '125px';*/
/*localStorage.removeItem('join');*/
/*}*/
/*});*/

loginToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '50px';
  registerToggle.style.left = '-450px';
  toggleBtn.style.left = '0';
  formBox.style.height = '450px';
  formBox.style.margin = '12% auto';
});

registerToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '450px';
  registerToggle.style.left = '50px';
  toggleBtn.style.left = '125px';
  formBox.style.height = '750px';
  formBox.style.margin = '10% auto';
});

showPass.forEach((spass) => {
  spass.addEventListener('click', () => {
    password.forEach((pass) => {
      if (pass.getAttribute('type') == 'password') {
        icon[0].setAttribute('class', 'icon fa-solid fa-eye');
        icon[1].setAttribute('class', 'icon fa-solid fa-eye');
        pass.setAttribute('type', 'text');
      } else {
        icon[0].setAttribute('class', 'icon fa-solid fa-eye-slash');
        icon[1].setAttribute('class', 'icon fa-solid fa-eye-slash');
        pass.setAttribute('type', 'password');
      }
    });
  });
});
