var subreddits = ['chungus'];

let images = [];

$.getJSON(`https://www.reddit.com/r/${subreddits.join('+')}/.json`, {
	tagmode: "any",
	format: "json"
}, function (response) {
	const validChildren = response.data.children.filter(child => !!child.data.preview).map(c => c.data.preview)
	const imgs = validChildren.flatMap((child) => {
		return child.images.flatMap(img => img.source.url)
	});

	images = imgs;
	console.log(imgs)
});

var refreshImage = function () {
	const rnd = Math.floor(Math.random() * images.length);
	document.querySelector('#random-image').src = images[rnd];
};

$('#random-image').on('click', function (event) {
	refreshImage();
});

function failedLoading(){
	document.querySelector('#random-image').src = 'chunkus.jpg'
}

$(document).ready(refreshImage());