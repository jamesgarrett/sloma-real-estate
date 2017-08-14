$(document).ready(function(){
	// variables
	var i = 0;
	var images = ['https://cosmicjs.imgix.net/85acf040-7d18-11e7-a068-a9973273ff4e-0008.jpg?w=1000','https://cosmicjs.imgix.net/1999e800-72ea-11e7-8622-cdb2269d4734-Unknown-4.jpeg?w=1000','https://cosmicjs.imgix.net/e8ec5af0-6e37-11e7-b171-9b085e2b736b-0005-2.jpg?w=1000'];
	var image = $('#background-slider');

	function preload() {
    $(images).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
	}
	// background slider
	image.css('background-image','url(https://cosmicjs.imgix.net/4b159f40-6e40-11e7-b262-b55cd8567838-0005-2.jpg?w=1000)');
	setInterval(function(){
		image.fadeOut(1000, function() {
			image.css('background-image', 'url(' + images[i++] +')');			
			image.fadeIn(1000);
		});
		if(i===images.length){
			i=0;
		}
	},10000);
	preload();
	
});