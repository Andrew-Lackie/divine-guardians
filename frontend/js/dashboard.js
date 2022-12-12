const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const themeToggler = document.querySelectorAll('.theme-toggler');
const n = 54;
const m = 18;
const k = 70;
const arrayForm = Array.from(Array(n).keys());
const arrayNotice = Array.from(Array(m).keys());
const arrayPie = Array.from(Array(k).keys());
const counter = document.querySelectorAll('.counter');
const buttons = document.querySelectorAll('.button');
const pages = document.querySelectorAll('.option');
const formGraph = document.querySelector('.form-graph');
const noticeGraph = document.querySelector('.notice-graph');
const pieGraph = document.querySelector('.pie');

// show sidebar
menuBtn.addEventListener('click', () => {
  sideMenu.style.display = 'block';
});

// counter forms
for (let key in arrayForm) {
  setTimeout(() => {
    counter[1].innerHTML = key;
    formGraph.innerHTML = key;
    formGraph.style.height = `${key}%`;
  }, 50 * key);
}

// counter notices
for (let key in arrayNotice) {
  setTimeout(() => {
    counter[2].innerHTML = key;
    noticeGraph.innerHTML = key;
    noticeGraph.style.height = `${key}%`;
  }, 50 * key);
}

for (let key in arrayPie) {
  setTimeout(() => {
    counter[0].innerHTML = key;
    pieGraph.innerHTML = key;
    pieGraph.style.setProperty('--p', key);
  }, 50 * key);
}

buttons.forEach((item, index) => {
  item.addEventListener('click', () => {
    let i = index;
    pages[index].style.display = 'grid';
    item.className = 'button active';

    switch (index) {
      case 0:
        break;

      case 1:
        pages[1].style.gridTemplateColumns = 'auto 25%';
        break;
      case 2:
        pages[2].style.gridTemplateColumns = 'auto 25%';
        break;
      case 3:
        pages[3].style.gridTemplateColumns = 'auto 25%';
        break;
      case 4:
        pages[4].style.gridTemplateColumns = 'auto 25%';
        break;
      case 5:
        pages[5].style.gridTemplateColumns = 'auto 25%';
        break;
      case 6:
        pages[6].style.gridTemplateColumns = 'auto 25%';
        break;
    }

    pages.forEach((item, index) => {
      if (index != i) {
        item.style.display = 'none';
        buttons[index].className = 'button';
      }
    });
  });
});

// close sidebar
closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
});

// change theme
themeToggler.forEach((item) => {
  item.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    item.querySelector('i:nth-child(2)').classList.toggle('active');
    item.querySelector('i:nth-child(1)').classList.toggle('active');
  });
});
/*Orders.forEach((order) => {*/
/*const tr = document.createElement('tr');*/
/*const trContent = `*/
/*<td>${order.productName}</td>*/
/*<td>${order.productNumber}</td>*/
/*<td>${order.paymentStatus}</td>*/
/*<td class="${*/
/*order.shipping === 'Declined'*/
/*? 'danger'*/
/*: order.shipping === 'pending'*/
/*? 'warning'*/
/*: 'primary'*/
/*}">${order.shippingStatus}</td>*/
/*<td>${order.productName}</td>*/

/*`;*/

/*tr.innerHTML = trContent;*/
/*document.querySelector('table tbody').appendChild(tr);*/
/*});*/
