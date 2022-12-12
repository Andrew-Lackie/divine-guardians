class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

		<script src="../js/auth.js"></script>
		<script src="../js/init.js"></script>

		<div header-container>

		<nav id="nav-bar">
				<ul>

					<li class="list-items" id="courses">

							<button type="button">Courses</button>
							<div class="dropdown" id="dropdown-courses">

								<a href="#">Test</a>
								<a href="#">Test</a>
								<a href="#">Test</a>

							</div>
					</li>


					<li class="list-items" id="about">

						<button type="button">About</button>
						<div class="dropdown" id="dropdown-about">

							<a href="about-us.html">About Us</a>
							<a href="contact-us.html">Contact Us</a>
							<a href="faq.html">FAQ</a>
						</div>
					</li>


					<li class="list-items" id="resources">
							<button type="button">Resources</button>
						<div class="dropdown" id="dropdown-resources">

							<a href="membership.html">Membership</a>
							<a href="doc-process.html">Document Processing</a>
							<a href="form-autofill.html">Form AutoFill Program</a>
							<a href="affil-pro.html">Affiliate Program</a>

						</div>
					</li>

					<li class="list-items" id="blog">
							<button type="button">Blog</button>
					</li>

				</ul>
	
				<div class="user-menu"> 
					<div class="theme-toggler">
						<i class="active fa-solid fa-sun"></i>
						<i class="fa-solid fa-moon"></i>
					</div>

					<div class="icon-container">
						<i class="nav-icon fa-xl fa-regular fa-user"></i>
					</div>

					<div id="menu">
						<button id="menu-select">
							<div id="menu-bar">
									<div id="bar1" class="bar"></div>
									<div id="bar2" class="bar"></div>
									<div id="bar3" class="bar"></div>
							</div>
						</button>
					</div>

					<div class="menu-bg" id="menu-bg">

						<div class="nav" id="nav">
							<ul>
								<li><a href="#">Home</a></li>
								<li><a href="#">About</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">Blog</a></li>
								<li><button class="logout" type="button">Logout</button></li>
							</ul>
						</div>

					</div>


				</div>
		</nav>

		<div id="logo-container" class="logo-container">
			<div class="logo-child-container">
					<a href="../index.html"><img id="logo" src="../images/dg-logo.png" alt="Logo"></a>
			</div>
			<div id="handwriting" class="logo-child-container">
				<img src="../images/divine-guardians-handwriting.png" alt="">
			</div>
			<div id="hero-btn" class="hero-btn">

				<div class="btn-container">
					<a id="join-btn" href="pages/login-page.html">Join</a>
					<a id="login-btn" href="pages/login-page.html">Login</a>
				</div>
			</div>

		</div>


		</div>
	</div>

`;
  }
}

customElements.define('header-component', Header);

window.addEventListener('load', (event) => {
  const courses = document.getElementById('dropdown-courses');
  const about = document.getElementById('dropdown-about');
  const resources = document.getElementById('dropdown-resources');
  const listItems = document.querySelectorAll('.list-items');
  const dropdown = document.querySelectorAll('.dropdown');
  const title = document.title;
  const pageTitles = ['dashboard', 'login', 'members'];
  const menuSelect = document.getElementById('menu-select');
  const menuBg = document.getElementById('menu-bg');
  const navBar = document.getElementById('nav-bar');
  const logo = document.getElementById('logo');
  const handwriting = document.getElementById('handwriting');
  const heroBtn = document.getElementById('hero-btn');
  const logoContainer = document.getElementById('logo-container');
  const ul = document.querySelector('ul');
  const logout = document.querySelector('.logout');
  const token = localStorage.getItem('token');
  const themeToggler = document.querySelector('.theme-toggler');

  themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('i:nth-child(2)').classList.toggle('active');
    themeToggler.querySelector('i:nth-child(1)').classList.toggle('active');
  });

  function logOut() {
    logout.addEventListener('click', (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('token_type');
      window.location.replace('login-page.html');
    });
  }

  if (token == null) {
    logout.textContent = 'Login';
  } else {
    logout.textContent = 'logout';
  }

  menuBg.style.display = 'none';
  menuSelect.addEventListener('click', (event) => {
    if (menuBg.style.display == 'none') {
      document.getElementById('menu-bar').classList.toggle('change');
      document.getElementById('nav').classList.toggle('change');
      menuBg.style.display = 'block';
      menuBg.style.margin = '0';
      navBar.style.height = '250px';
    } else {
      document.getElementById('menu-bar').classList.toggle('change');
      document.getElementById('nav').classList.toggle('change');
      menuBg.style.display = 'none';
      navBar.style.height = '40px';
    }
  });

  function minimizeMenu() {
    pageTitles.forEach((item, index) => {
      if (title == pageTitles[index]) {
        logo.style.width = '20%';
        logo.style.display = 'block';
        handwriting.style.display = 'none';
        heroBtn.style.display = 'none';
        logoContainer.style.height = '80px';
        ul.style.paddingLeft = '40px';
      }
    });
  }

  function menuLoadSmall() {
    listItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        let itemList;
        if (index == 0) {
          itemList = courses;
        } else if (index == 1) {
          itemList = about;
        } else {
          itemList = resources;
        }
        itemList.style.display = 'block';
        itemList.style.zIndex = '2';
        itemList.style.position = 'fixed';
        itemList.style.width = '100vw';
        itemList.style.height = '80px';
        itemList.style.marginTop = '9px';
        itemList.style.marginLeft = '0px';
      });

      dropdown.forEach((item) => {
        item.addEventListener('mouseleave', (e) => {
          logo.style.width = '20%';
          logo.style.display = 'block';
          handwriting.style.display = 'none';
          heroBtn.style.display = 'none';
          logoContainer.style.height = '80px';
          //ul.style.paddingLeft = '40px';
          item.style.display = 'none';
        });
      });
    });
  }
  function menuLoadBig() {
    listItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        logo.style.width = '20%';
        logo.style.display = 'none';
        handwriting.style.display = 'none';
        heroBtn.style.display = 'none';
        logoContainer.style.height = '80px';
        let itemList;
        let noneStyle;
        if (index == 0) {
          itemList = courses;
          noneStyle = [about, resources];
        } else if (index == 1) {
          itemList = about;
          noneStyle = [courses, resources];
        } else {
          itemList = resources;
          noneStyle = [courses, about];
        }
        itemList.style.display = 'block';
        noneStyle[0].style.display = 'none';
        noneStyle[1].style.display = 'none';
        itemList.style.zIndex = '2';
        itemList.style.position = 'fixed';
        itemList.style.width = '100vw';
        itemList.style.height = '80px';
        itemList.style.marginTop = '9px';
        itemList.style.marginLeft = '0px';
      });

      dropdown.forEach((item) => {
        item.addEventListener('mouseleave', (e) => {
          logoContainer.style.display = 'block';
          logo.style.display = 'block';
          logo.style.width = '40%';
          handwriting.style.display = 'block';
          heroBtn.style.display = 'block';
          logoContainer.style.height = '350px';
          item.style.display = 'none';
          minimizeMenu();
        });
      });
    });
  }
  window.onscroll = function () {
    scrollFunction();
    minimizeMenu();
  };

  minimizeMenu();
  menuLoadSmall();
  menuLoadBig();

  function scrollFunction() {
    courses.style.display = 'none';
    about.style.display = 'none';
    resources.style.display = 'none';
    if (
      document.body.scrollTop > 10 ||
      document.documentElement.scrollTop > 10
    ) {
      logo.style.width = '20%';
      logo.style.display = 'block';
      handwriting.style.display = 'none';
      heroBtn.style.display = 'none';
      logoContainer.style.height = '80px';

      menuLoadSmall();
    } else {
      logoContainer.style.display = 'block';
      logo.style.display = 'block';
      logo.style.width = '40%';
      handwriting.style.display = 'block';
      heroBtn.style.display = 'block';
      logoContainer.style.height = '350px';

      menuLoadBig();
    }
  }
  logOut();
});
