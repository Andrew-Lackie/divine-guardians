// local courses data

const courses = [
  {
    id: 1,
    header: 'Contract',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'fa-solid fa-file-contract fa-3x',
  },
  {
    id: 2,
    header: 'Estate',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'fa-solid fa-house fa-3x',
  },
  {
    id: 3,
    header: 'Dictionary',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'fa-solid fa-book fa-3x',
  },
  {
    id: 4,
    header: 'Equity',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: 'fa-solid fa-house fa-3x',
  },
];

// select items

// left elements
const leftImg = document.getElementById('left-img');
const leftHeader = document.getElementById('left-header');
const leftParagraph = document.getElementById('left-paragraph');

// middle elements
const middleImg = document.getElementById('middle-img');
const middleHeader = document.getElementById('middle-header');
const middleParagraph = document.getElementById('middle-paragraph');

// right elements
const rightImg = document.getElementById('right-img');
const rightHeader = document.getElementById('right-header');
const rightParagraph = document.getElementById('right-paragraph');

// buttons
const prevBtn = document.getElementById('button-left-container');
const nextBtn = document.getElementById('button-right-container');

// index
let currentItemLeft = 0;
let currentItemMiddle = 1;
let currentItemRight = 2;

// load initial item
window.addEventListener('DOMContentLoaded', function () {
  updateLeft(currentItemLeft);
  updateMiddle(currentItemMiddle);
  updateRight(currentItemRight);
});

// functions
function updateLeft(course) {
  const item = courses[course];
  leftImg.className = item.img;
  leftHeader.textContent = item.header;
  leftParagraph.textContent = item.paragraph;
}

function updateMiddle(course) {
  const item = courses[course];
  middleImg.className = item.img;
  middleHeader.textContent = item.header;
  middleParagraph.textContent = item.paragraph;
}

function updateRight(course) {
  const item = courses[course];
  rightImg.className = item.img;
  rightHeader.textContent = item.header;
  rightParagraph.textContent = item.paragraph;
}

nextBtn.addEventListener('click', function () {
  currentItemLeft++;
  currentItemMiddle++;
  currentItemRight++;
  if (currentItemLeft > courses.length - 1) {
    currentItemLeft = 0;
  }
  if (currentItemMiddle > courses.length - 1) {
    currentItemMiddle = 0;
  }
  if (currentItemRight > courses.length - 1) {
    currentItemRight = 0;
  }

  updateLeft(currentItemLeft);
  updateMiddle(currentItemMiddle);
  updateRight(currentItemRight);
});

prevBtn.addEventListener('click', function () {
  currentItemLeft--;
  currentItemMiddle--;
  currentItemRight--;

  if (currentItemLeft < 0) {
    currentItemLeft = courses.length - 1;
    currentItemMiddle = 0;
  }

  if (currentItemMiddle < 0) {
    currentItemMiddle = courses.length - 1;
  }

  if (currentItemRight < 0) {
    currentItemRight = courses.length - 1;
  }

  updateLeft(currentItemLeft);
  updateMiddle(currentItemMiddle);
  updateRight(currentItemRight);
});


