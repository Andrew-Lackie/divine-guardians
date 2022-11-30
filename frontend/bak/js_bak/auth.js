class Auth {
  constructor() {
    document.querySelector('body').style.display = 'none';
    const token = localStorage.getItem('token');
    this.validateAuth(token);
  }

  validateAuth(token) {
    if (token == null) {
      window.location.replace('login-page.html');
    } else {
      document.querySelector('body').style.display = 'block';
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    window.location.replace('login-page.html');
  }
}
