var keywords = ['chungus'];

var refreshImage = function() {
	var rndIndex = Math.round(Math.random()*(keywords.length-1));

	$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
		tags: keywords[rndIndex],
		tagmode: "any",
		format: "json"
	}, function(data) {
		console.debug(keywords[rndIndex]);
		var rnd = Math.floor(Math.random() * data.items.length);
		var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
		console.log(image_src);
		$('#random-image').hide().html('<img src="'+image_src+'">').fadeIn();
		var createdImg = $('img');
		createdImg.addClass('img-responsive');
		createdImg.on('click', function(event) {
			refreshImage();
		});

	});
};

$(document).ready(refreshImage());