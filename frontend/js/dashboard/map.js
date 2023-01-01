//Get state/province from map

var states = document.querySelectorAll('path');

states.forEach((value) => {
  value.addEventListener('click', () => {
    var country = value.getAttribute('id');
    console.log(country);
  });
});
