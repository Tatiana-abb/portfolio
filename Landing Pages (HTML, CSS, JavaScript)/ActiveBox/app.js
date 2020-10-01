
// для того, чтобы сначала прогрузилась вся страниза, а затем запустился код
$(function(){

	// Fixed Header
	let header = $("#header");
	let intro = $("#intro");
	let introH = intro.innerHeight();//высота блока интро (включая paddings)

	let scrollPos = $(window).scrollTop();//позиция скрола экрана

	let nav = $("#nav");
	let navToggle = $("#navToggle");

	checkScroll(scrollPos, introH);

	// отслеживание значения скрола
	//срабатывает при scroll и load(загрузка) и resize(изменение размера экрана)
	$(window).on("scroll resize", function(){

		introH = intro.innerHeight();
		scrollPos = $(this).scrollTop();

		checkScroll(scrollPos, introH);
	});
	//------------------------------

	function checkScroll(scrollPos, introH){
		if(scrollPos>introH){
			header.addClass('fixed');
		}
		else{
			header.removeClass('fixed');
		}
	}


// Smooth Scroll

// выборка эл-та с атрибутом data-scroll
//АТРИБУТЫ УКАЗЫВАЮТСЯ В []
$("[data-scroll]").on("click",function(event) {

	event.preventDefault();//отмена стандартного поведения при клике

	// $(this) - указывает, что это эл-т по которому мы кликнули
	// .data - обращение к его атрибуту
	// ('scroll') - атрибут, который нам нужен
	let elementId = $(this).data('scroll');

	let elementOffset = $(elementId).offset().top;

	nav.removeClass('show');

	console.log(elementOffset);

	$('html, body').animate({
		scrollTop: elementOffset-70
	},
	700//скорост скрола
	);

});


// nav Toggle

$("#navToggle").on("click", function(event){

	event.preventDefault();//отмена стандартного поведения при клике

	nav.toggleClass('show');

});



//Reviews

let slider = $("#reviewSlider");

slider.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: false,
  dots: true
});

});