// select items
let loginToggle = document.getElementById("login");
let registerToggle = document.getElementById("register");
let toggleBtn = document.getElementById("btn");

// buttons
const loginToggleBtn = document.getElementById("login-toggle-btn");
const registerToggleBtn = document.getElementById("register-toggle-btn");
const loginSubmitBtn = document.getElementById("login-submit-btn");
const registerSubmitBtn = document.getElementById("register-submit-btn");

// event listeners

loginToggleBtn.addEventListener('click', function() {
	loginToggle.style.left = "50px";
	registerToggle.style.left = "-450px";
	toggleBtn.style.left = "0";
})

registerToggleBtn.addEventListener('click', function() {
	loginToggle.style.left = "450px";
	registerToggle.style.left = "50px";
	toggleBtn.style.left = "125px";
})

loginSubmitBtn.addEventListener('click', function() {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	//let checkBox = document.getElementById("pass-check-box").value;

	var userData = {};
	userData.email = email;
	userData.password = password;
	//userData.checkBox = checkBox;

	//var data = new FormData();
	//data.append('username', 'candy@shaw.com');
	//data.append('password', 'password1');

	//fetch('http://127.0.0.1:8000/login', { method: "POST", body: data})
})

registerSubmitBtn.addEventListener('click', function() {
	//let username = document.getElementById("new-username").value;
	let email = document.getElementById("new-email").value;
	let password = document.getElementById("new-password").value;
	//let checkBox = document.getElementById("terms-check-box").value;

	var userData = {};
	//userData.username = username;
	userData.email = email;
	userData.password = password;
	//userData.checkBox = checkBox;
	event.preventDefault()

 /* fetch('http://127.0.0.1:8000/users/id', {*/
		/*method: "POST",*/
		/*mode: 'cors',*/
		/*headers: { "Content-Type": "application/json" },*/
		/*body: JSON.stringify(userData),*/
	/*})*/

})
