'use strict';
const userName = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');

function loadData(url) {
	const functionName = 'callback';
	return new Promise((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		document.body.appendChild(script);
	});
}

function profile(userData) {
	userName.textContent = userData.name;
	description.textContent = userData.description;
	pic.src = userData.pic;
	position.textContent = userData.position;

	loadData(`https://neto-api.herokuapp.com/profile/${userData.id}/technologies`)
		.then(technology);
	content.style.display = 'initial';
}

function technology(tehData) {
	Array.from(tehData).forEach( element => {
		const span = document.createElement('span');
		technologies.appendChild(span);
		technologies.lastElementChild.classList.add('devicons');
		technologies.lastElementChild.classList.add(`devicons-${element}`);
	});
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(profile);