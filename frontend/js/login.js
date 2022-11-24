class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      let error = 0;
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);

        if (self.validateFields(input) == false) {
          error++;
        }
      });
      if (error == 0) {
        let data = {
          username: document.querySelector('#email').value,
          password: document.querySelector('#password').value,
        };

        const toUrlEncoded = (obj) =>
          Object.keys(obj)
            .map(
              (k) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
            )
            .join('&');

        const encodedData = toUrlEncoded(data);

        fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          body: encodedData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const errorMessage = document.getElementById('invalid-credentials');
            if (data.detail) {
              errorMessage.display = 'block';
              errorMessage.innerHTML =
                'Your password or username is incorrect, please try again.';
            } else {
              errorMessage.style.display = 'none';
              localStorage.setItem('token', data.access_token);
              localStorage.setItem('token_type', data.token_type);
              localStorage.setItem('auth', 1);
              this.form.submit();
            }
          });
      }
    });
  }

  validateFields(field) {
    if (field.value.trim() === '') {
      this.setStatus(
        field,
        `${field.getAttribute('placeholder')} cannot be blank`,
        'error'
      );
      return false;
    } else {
      if (field.getAttribute('placeholder') == 'Password') {
        if (field.value.length < 8) {
          this.setStatus(
            field,
            `${field.getAttribute(
              'placeholder'
            )} must be at least 8 characters`,
            'error'
          );
          return false;
        } else {
          this.setStatus(field, null, 'success');
          return true;
        }
      } else {
        this.setStatus(field, null, 'success');
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (status == 'error') {
      errorMessage.innerText = message;
      field.classList.add('input-error');
    }

    if (status == 'success') {
      if (errorMessage) {
        errorMessage.innerText = '';
      }
      field.classList.remove('input-error');
    }
  }
}

const login = document.getElementById('login');
if (login) {
  const fields = ['email', 'password'];
  const validate = new Login(login, fields);
}
