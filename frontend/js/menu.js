
//let courses = ["ontario-acts", "us-rules-that-apply-to-canada", "caselaw-files", "contract-law", "dictionaries", "equity", "books", "estates", "international-law-notes", "jusrisdiction", "fiduciary-duties", "postal-regulations", "us-the-corporation", "freedom-school-court-docs", "oaths", "parental-and-child", "liens", "mareva-injunction", "checkout", "notice-samples", "remedy-manuals", "affidavit-samples", "conditional-acceptance", "court-petitions-and-writs", "letters-of-marque", "scans-for-canada-sec", "security-related", "tax-related", "trusts"]


//selecters

let i = 0;
const image = ["dictionary", "contract", "estate", "dictionary"];
const id = ['#courses-left-container', '#courses-middle-container', '#courses-right-container'];
const idR = ['#courses-right-container', '#courses-middle-container', '#courses-left-container'];
const alt = ["hi", "hi", "hi", "hi"];
const header = ["Blah Blah", "Lob Law", "Blew the mew", "Big bright dew"];
const paragraph = ["In the beginning", "In the beginning", "In the beginning", "In the beginning", "In the beginning"];
const courses = ['#courses-left-container', '#courses-middle-container', '#courses-right-container'];
const leftButton = document.querySelector("#button-left-container");
const rightButton = document.querySelector("#button-right-container");
const parent = document.querySelector(".action-container");
let element;


//event listeners

leftButton.addEventListener("click", menuBackwards);
rightButton.addEventListener("click", menuForward);

//functions

function menuForward() {
	let	remove = document.querySelector(`${id[i]}`);
	if (document.querySelector(`${id[i]}`)) {
		remove.parentNode.removeChild(remove);
	}

	element = document.createElement('div');
	element.classList.add('course-container');
	element.innerHTML = `<img src="images/${image[i]}.jpg" alt="${alt[i]}"> <h3>${header[i]}</h3> <p>${paragraph[i]}</p>`;

	if ((i+1) % 3 == 1) {
		element.setAttribute("id", `${id[i]}`);
	}

	else if ((i+1) % 3 == 2) {
		element.setAttribute("id", `${id[i]}`);
	}

	else if ((i+1) % 3 == 0) {
		element.setAttribute("id", `${id[i]}`);
	}

	parent.appendChild(element);

	i++;

	if (i > 2) {
		i = 0;
	}

}



function menuBackwards() {
	let	remove = document.querySelector(`${idR[i]}`);
	if (document.querySelector(`${idR[i]}`)) {
		remove.parentNode.removeChild(remove);
	}

	element = document.createElement('div');
	element.classList.add('course-container');
	element.innerHTML = `<img src="images/${image[i]}.jpg" alt="${alt[i]}"> <h3>${header[i]}</h3> <p>${paragraph[i]}</p>`;

	if ((i+1) % 3 == 1) {
		element.setAttribute("id", `${idR[i]}`);
	}

	else if ((i+1) % 3 == 2) {
		element.setAttribute("id", `${idR[i]}`);
	}

	else if ((i+1) % 3 == 0) {
		element.setAttribute("id", `${idR[i]}`);
	}

	parent.appendChild(element);

	i++;

	if (i > 2) {
		i = 0;
	}


}

