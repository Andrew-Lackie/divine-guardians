// Declare all variables
function formCategory(evt, formName) {
  var i, tabcontent, tablinks, checkboxes;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  } // Show the current tab, and add an "active" class to the button that opened the tab

  document.getElementById(formName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

function formSelector(evt, formName) {
  if (event.currentTarget.checked) {
    document.getElementById(formName).style.display = 'block';
  } else {
    document.getElementById(formName).style.display = 'none';
  }
}
