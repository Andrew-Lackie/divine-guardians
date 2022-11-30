const continueBtn = document.querySelector('.continue-btn');
const name = document.querySelector('#name');
const fname = localStorage.getItem('fname');

name.innerText = fname;

continueBtn.addEventListener('click', (e) => {
  window.location.replace('dashboard.html');
});
