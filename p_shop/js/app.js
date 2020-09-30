$(function(){

	/*IntroSider: https://kenwheeler.github.io/slick/*/

	let slider = $("#introSlider");

	slider.slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  fade: false,
	  arrows: false,
	  dots: true
	});

});