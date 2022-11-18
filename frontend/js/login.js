class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
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
        console.log('Success');
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
