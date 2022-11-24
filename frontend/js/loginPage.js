// select items
let loginToggle = document.getElementById('login');
let registerToggle = document.getElementById('register');
let toggleBtn = document.getElementById('btn');
let password = document.getElementById('password');
let newPassword = document.getElementById('new-password');
let confPassword = document.getElementById('confirm-password');

// buttons
const loginToggleBtn = document.getElementById('login-toggle-btn');
const registerToggleBtn = document.getElementById('register-toggle-btn');
const loginShowPass = document.getElementById('login-show-password');
const regShowPass = document.getElementById('reg-show-password');
const formBox = document.querySelector('.form-box');

// event listeners

loginToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '50px';
  registerToggle.style.left = '-450px';
  toggleBtn.style.left = '0';
  formBox.style.height = '450px';
  formBox.style.margin = '10% auto';
});

registerToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '450px';
  registerToggle.style.left = '50px';
  toggleBtn.style.left = '125px';
  formBox.style.height = '600px';
  formBox.style.margin = '6% auto';
});

loginShowPass.addEventListener('change', function () {
  if (password.getAttribute('type') == 'password') {
    password.setAttribute('type', 'text');
  } else {
    password.setAttribute('type', 'password');
  }
});

regShowPass.addEventListener('change', function () {
  if (newPassword.getAttribute('type') == 'password') {
    newPassword.setAttribute('type', 'text');
  } else {
    newPassword.setAttribute('type', 'password');
  }

  if (confPassword.getAttribute('type') == 'password') {
    confPassword.setAttribute('type', 'text');
  } else {
    confPassword.setAttribute('type', 'password');
  }
});
