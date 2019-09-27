var subreddits = ['corn'];

let images = [];

let xhr = new XMLHttpRequest();

xhr.open("GET", `https://www.reddit.com/r/${subreddits.join('+')}/.json?raw_json=1`)
xhr.send()

xhr.onload = function () {
	console.log(xhr.response)
	const validChildren = JSON.parse(xhr.response).data.children.filter(child => !!child.data.preview).map(c => c.data.preview)
	const imgs = validChildren.flatMap((child) => {
		return child.images.flatMap(img => img.source.url)
	});

	images = imgs;
	console.log(imgs);

	document.querySelector('#random-image').addEventListener('click', function (event) {
		refreshImage();
	});
	refreshImage();
};

xhr.onerror = failedLoading

var refreshImage = function () {
	const rnd = Math.floor(Math.random() * images.length);
	document.querySelector('#random-image').src = images[rnd];
};


function failedLoading() {
	console.log("failed to open images, displaying default");
	document.querySelector('#random-image').src = 'corn.jpg'
}
