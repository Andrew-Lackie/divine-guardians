class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

		<nav>
				<img id="logo" src="../images/dg-logo.png" alt="Logo">
				<ul>
					<li>
						<a href="../index.html">Home</a>
					</li>

					<li id="courses">
						<div class="dropdown-wrapper">

							<button type="button">Courses</button>
							<div class="dropdown" id="dropdown-courses">

								<a href="#">Test</a>
								<a href="#">Test</a>
								<a href="#">Test</a>

							</div>
						</div>
					</li>


					<li id="about">
						<div class="dropdown-wrapper">

						<button type="button">About</button>
						<div class="dropdown" id="dropdown-about">

							<a href="about-us.html">About Us</a>
							<a href="contact-us.html">Contact Us</a>
							<a href="faq.html">FAQ</a>

						</div>
						</div>
					</li>


					<li id="resources">
						<div class="dropdown-wrapper">
						<button type="button">Resources</button>
						<div class="dropdown" id="dropdown-resources">

							<a href="membership.html">Membership</a>
							<a href="doc-process.html">Document Processing</a>
							<a href="form-autofill.html">Form AutoFill Program</a>
							<a href="affil-pro.html">Affiliate Program</a>

						</div>
						</div>
					</li>


					<li id="blog">
						<a href="#">Blog</a>
					</li>


<!--					<li id="account">
						<div class="dropdown-wrapper">
						<button type="button">Account</button>
						<div class="dropdown" id="dropdown-account">

							<a href="login-page.html">Login</a>
							<a href="register-page.html">Register</a>
							<a href="#">Dashboard</a> -->

						</div>
						</div>
					</li>
				</ul>

				

	
				<div class="user-menu"> 
					<div class="icon-container">
						<i class="nav-icon fa-xl fa-regular fa-user"></i>
					</div>
					<div class="icon-container">
						<i class="nav-icon fa-xl fa-solid fa-cart-shopping"></i>
					</div>

					<div id="menu">
						<div id="menu-bar" onclick="menuOnClick()">
							<div id="bar1" class="bar"></div>
							<div id="bar2" class="bar"></div>
							<div id="bar3" class="bar"></div>
						</div>
						<nav class="nav" id="nav">
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">About</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">Blog</a></li>
							</ul>
						</nav>
					</div>

					<div class="menu-bg" id="menu-bg"></div>


				</div>
		</nav>
`;
  }
}

user = document.querySelector('.fa-user');
cart = document.querySelector('.fa-cart-shopping');
bars = document.querySelector('.fa-bars');

function menuOnClick() {
  document.getElementById('menu-bar').classList.toggle('change');
  document.getElementById('nav').classList.toggle('change');
  document.getElementById('menu-bg').classList.toggle('change-bg');
}

customElements.define('header-component', Header);
