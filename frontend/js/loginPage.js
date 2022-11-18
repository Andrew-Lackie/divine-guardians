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
const loginSubmitBtn = document.getElementById('login-submit-btn');
const registerSubmitBtn = document.getElementById('register-submit-btn');
const loginShowPass = document.getElementById('login-show-password');
const regShowPass = document.getElementById('reg-show-password');

// event listeners

loginToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '50px';
  registerToggle.style.left = '-450px';
  toggleBtn.style.left = '0';
});

registerToggleBtn.addEventListener('click', function () {
  loginToggle.style.left = '450px';
  registerToggle.style.left = '50px';
  toggleBtn.style.left = '125px';
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

loginSubmitBtn.addEventListener('click', function () {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  var userData = {};
  userData.email = email;
  userData.password = password;
});

registerSubmitBtn.addEventListener('click', function () {
  let email = document.getElementById('new-email').value;
  let password = document.getElementById('new-password').value;
  //let checkBox = document.getElementById('terms-check-box').value;

  var userData = {};
  userData.email = email;
  userData.password = password;
  //userData.checkBox = checkBox;
});