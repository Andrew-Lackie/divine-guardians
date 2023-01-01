// Show file chosen
const actualBtn = document.getElementById('file');
const fileChosen = document.getElementById('file-chosen');

actualBtn.addEventListener('change', function () {
  fileChosen.textContent = this.files[0].name;
});

// Post to backend

const form = document.getElementById('notice-form');

let formData;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formData = new FormData(form);
  formData.append('name', document.getElementById('name').value);
  formData.append('file', document.getElementById('file').value);
  formData.append('date', document.getElementById('date').value);

  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }

  fetch('http://127.0.0.1:8000/public-notice-board', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
