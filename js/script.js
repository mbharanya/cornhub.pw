var subreddits = ['chungus'];

let images = [];

$.getJSON(`https://www.reddit.com/r/${subreddits.join('+')}/.json`, {
	raw_json: "1"
}, function (response) {
	const validChildren = response.data.children.filter(child => !!child.data.preview).map(c => c.data.preview)
	const imgs = validChildren.flatMap((child) => {
		return child.images.flatMap(img => img.source.url)
	});

	images = imgs;
	console.log(imgs);
	
	$('#random-image').on('click', function (event) {
		refreshImage();
	});
	refreshImage();
}).fail(failedLoading);

var refreshImage = function () {
	const rnd = Math.floor(Math.random() * images.length);
	document.querySelector('#random-image').src = images[rnd];
};


function failedLoading(){
	console.log("failed to open images, displaying default");
	document.querySelector('#random-image').src = 'chungus.jpg'
}
