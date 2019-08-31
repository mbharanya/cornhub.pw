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
	console.log(imgs);
	refreshImage();
});

var refreshImage = function () {
	const rnd = Math.floor(Math.random() * images.length);
	document.querySelector('#random-image').src = decodeHTML(images[rnd]);
};

$('#random-image').on('click', function (event) {
	refreshImage();
});

function failedLoading(){
	console.log("failed to open images, displaying default");
	document.querySelector('#random-image').src = 'chungus.jpg'
}

var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};