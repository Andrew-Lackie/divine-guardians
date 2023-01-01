//Submit form

var submit = document.getElementById('search');
var options = document.querySelectorAll('.select-dropdown > select');
var search = {};
var option;

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  for (var i = 0; i < options.length; i++) {
    option = options[i];
    search[`${option.name}`] = option.value;
  }
  console.log(search);
});
