class Register {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.registerOnSubmit();
  }

  registerOnSubmit() {
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
          fname: document.querySelector('#fname').value,
          lname: document.querySelector('#fname').value,
          email: document.querySelector('#new-email').value,
          password: document.querySelector('#new-password').value,
        };

        fetch('http://127.0.0.1:8000/users', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //const errorMessage = document.getElementById('email-error');
            /*if (data.detail) {*/
            /*console.log('ERROR');*/
            /*errorMessage.display = 'block';*/
            /*errorMessage.innerHTML =*/
            /*'Your password or username is incorrect, please try again.';*/
            /*} else {*/
            /*errorMessage.style.display = 'none';*/
            /*localStorage.setItem('token', data.access_token);*/
            /*localStorage.setItem('token_type', data.token_type);*/
            this.form.submit();
            /*}*/
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
      if (field.getAttribute('class') == 'password') {
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

const register = document.getElementById('register');
if (register) {
  const fields = [
    'fname',
    'lname',
    'new-email',
    'new-password',
    'confirm-password',
  ];
  const validate = new Register(register, fields);
}
