class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

		<nav id="ul">
				<ul>
					<li>
						<a href="../index.html">Home</a>
					</li>

					<li id="courses">

							<button type="button">Courses</button>
							<div class="dropdown" id="dropdown-courses">

								<a href="#">Test</a>
								<a href="#">Test</a>
								<a href="#">Test</a>

							</div>
					</li>


					<li id="about">

						<button type="button">About</button>
						<div class="dropdown" id="dropdown-about">

							<a href="about-us.html">About Us</a>
							<a href="contact-us.html">Contact Us</a>
							<a href="faq.html">FAQ</a>
						</div>
					</li>


					<li id="resources">
							<button type="button">Resources</button>
						<div class="dropdown" id="dropdown-resources">

							<a href="membership.html">Membership</a>
							<a href="doc-process.html">Document Processing</a>
							<a href="form-autofill.html">Form AutoFill Program</a>
							<a href="affil-pro.html">Affiliate Program</a>

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

		<div id="logo-container" class="logo-container">
			<div class="logo-child-container">
					<img id="logo" src="../images/dg-logo.png" alt="Logo">
			</div>
			<div id="handwriting" class="logo-child-container">
				<img src="../images/divine-guardians-handwriting.png" alt="">
			</div>
			<div id="btn" class="hero-btn">

				<div class="btn-container">
					<a id="join" href="pages/register-page.html">Join</a>
					<a id="login" href="pages/login-page.html">Login</a>
				</div>
			</div>

		</div>


		</div>

`;
  }
}

customElements.define('header-component', Header);

function menuOnClick() {
  document.getElementById('menu-bar').classList.toggle('change');
  document.getElementById('nav').classList.toggle('change');
  document.getElementById('menu-bg').classList.toggle('change-bg');
}

window.addEventListener('load', (event) => {
  const courses = document.getElementById('courses');
  const about = document.getElementById('about');
  const resources = document.getElementById('resources');
  const ul = document.getElementById('ul');

  function menuLoadSmall() {
    courses.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.width = '20%';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = 'auto';
    });

    about.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.width = '20%';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = 'auto';
    });

    resources.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.width = '20%';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = 'auto';
    });
  }

  function menuLoadBig() {
    courses.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.display = 'block';
      document.getElementById('logo').style.width = '40%';
      document.getElementById('handwriting').style.display = 'block';
      document.getElementById('btn').style.display = 'block';
      document.getElementById('logo-container').style.height = '350px';
    });

    about.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.display = 'block';
      document.getElementById('logo').style.width = '40%';
      document.getElementById('handwriting').style.display = 'block';
      document.getElementById('btn').style.display = 'block';
      document.getElementById('logo-container').style.height = '350px';
    });

    resources.addEventListener('mouseover', (e) => {
      document.getElementById('logo').style.display = 'none';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';
    });

    ul.addEventListener('mouseout', (e) => {
      document.getElementById('logo').style.display = 'block';
      document.getElementById('logo').style.width = '40%';
      document.getElementById('handwriting').style.display = 'block';
      document.getElementById('btn').style.display = 'block';
      document.getElementById('logo-container').style.height = '350px';
    });
  }

  menuLoadSmall();
  menuLoadBig();

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById('logo').style.width = '20%';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';

      menuLoadSmall();
    } else {
      document.getElementById('logo').style.display = 'block';
      document.getElementById('logo').style.width = '40%';
      document.getElementById('handwriting').style.display = 'block';
      document.getElementById('btn').style.display = 'block';
      document.getElementById('logo-container').style.height = '350px';

      menuLoadBig();
    }
  }

  /*function navOnHover() {*/
  /*document.getElementById('handwriting').style.display = 'block';*/
  /*document.getElementById('btn').style.display = 'block';*/
  /*document.getElementById('logo-container').style.height = '350px';*/
  /*}*/
});
