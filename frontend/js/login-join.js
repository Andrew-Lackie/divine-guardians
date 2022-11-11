// select items
let x = document.getElementById("login");
let y = document.getElementById("register");
let z = document.getElementById("btn");

// buttons
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// event listeners

loginBtn.addEventListener('click', function() {
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0";
})

registerBtn.addEventListener('click', function() {
	x.style.left = "-400px";
	y.style.left = "50px";
	z.style.left = "125px";
})



	
