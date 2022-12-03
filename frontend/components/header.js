class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `

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


				</ul>

				

	
				<div class="user-menu"> 
					<div class="icon-container">
						<i class="nav-icon fa-xl fa-regular fa-user"></i>
					</div>
					<div class="icon-container">
						<i class="nav-icon fa-xl fa-solid fa-cart-shopping"></i>
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
								<li><button type="button">Logout</button></li>
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
  const join = document.getElementById('join-btn');
  const login = document.getElementById('login-btn');
  const title = document.title;
  const pageTitles = ['dashboard', 'login'];
  const menuSelect = document.getElementById('menu-select');
  const menuBg = document.getElementById('menu-bg');
  const navBar = document.getElementById('nav-bar');

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
        document.getElementById('logo').style.width = '20%';
        document.getElementById('handwriting').style.display = 'none';
        document.getElementById('hero-btn').style.display = 'none';
        document.getElementById('logo-container').style.height = '80px';
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
          document.getElementById('logo').style.width = '20%';
          document.getElementById('logo').style.display = 'block';
          document.getElementById('handwriting').style.display = 'none';
          document.getElementById('hero-btn').style.display = 'none';
          document.getElementById('logo-container').style.height = '80px';
          item.style.display = 'none';
        });
      });
    });
  }
  function menuLoadBig() {
    listItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        document.getElementById('logo-container').style.height = '80px';
        document.getElementById('logo').style.display = 'none';
        document.getElementById('handwriting').style.display = 'none';
        document.getElementById('hero-btn').style.display = 'none';
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
          document.getElementById('logo-container').style.display = 'block';
          document.getElementById('logo').style.display = 'block';
          document.getElementById('logo').style.width = '40%';
          document.getElementById('handwriting').style.display = 'block';
          document.getElementById('hero-btn').style.display = 'block';
          document.getElementById('logo-container').style.height = '350px';
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
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById('logo').style.width = '20%';
      document.getElementById('logo').style.display = 'block';
      document.getElementById('handwriting').style.display = 'none';
      document.getElementById('hero-btn').style.display = 'none';
      document.getElementById('logo-container').style.height = '80px';

      menuLoadSmall();
    } else {
      document.getElementById('logo').style.display = 'block';
      document.getElementById('logo').style.width = '40%';
      document.getElementById('handwriting').style.display = 'block';
      document.getElementById('hero-btn').style.display = 'block';
      document.getElementById('logo-container').style.height = '350px';

      menuLoadBig();
    }
  }

  /*login.addEventListener('click', (e) => {*/
  /*localStorage.setItem('login', 1);*/
  /*});*/

  /*join.addEventListener('click', (e) => {*/
  /*localStorage.setItem('join', 1);*/
  /*});*/
});
