$(document).ready(() => {
	$("[data-match-height]").each(function () {
		$(this).find($(this).attr("data-match-height")).matchHeight();
	});
	$('body').on('click', '#header .menu-popup .toggle:not(.back)', function (){
		$("#menu_popup").toggleClass("open");
		$("body").addClass("disable_scroll");
		$("#header .menu-popup .toggle").addClass("back");
		setTimeout(() => $("#menu_popup").toggleClass("animate"), 10);
	});
	$('body').on('click', '#header .menu-popup .back,#menu_popup .back', function (){
		$("#menu_popup").removeClass("animate");
		$("body").removeClass("disable_scroll");
		$("#header .menu-popup .toggle").removeClass("back");
		setTimeout(() => $("#menu_popup").removeClass("open"), 400);
	});

	if ($(".home-slider .slider").length) {
		tns({
			container: ".home-slider .slider",
			items: 1,
			gutter: 30,
			controlsText: ["", ""],
			nav: false,
			loop: false
		});
	}
	if ($(".booking .slider").length) {
		tns({
			container: ".booking .slider",
			items: 1,
			gutter: 30,
			controlsText: ["", ""],
			nav: false,
			loop: false
		});
	}
	$('.slider-type2 .slider').each(function(){
		tns({
		 container: this,
		 items: 1,
		 gutter: 30,
		//  controlsText: ["", ""],
		 controls: true,
		 controlsContainer: $(this).closest('.container').find(">.my-controls")[0],
		 nav: false,
		 loop: false
		});
		$('.slider-type2 .slider .btn-wrap .my-controls button').click(function(e){
			e.stopImmediatePropagation();
			if($(this).hasClass('prew'))$(this).closest('.container').find('>.my-controls button.prew').trigger('click');
			else if($(this).hasClass('next'))$(this).closest('.container').find('>.my-controls button.next').trigger('click');
		});
	});

	$('.slider-type1 .slider').each(function(){
		tns({
		 container: this,
		 items: 1,
		 gutter: 30,
		 controlsText: ["", ""],
		 nav: false,
		 loop: false
		});
	});

	$(".datepicker").datepicker({autoHide: true, format: "dd/mm/yyyy"});
	$(".datepicker_dd_mm").each(function () {
		$(this).datepicker({autoHide: true, format: "dd.mm.yy"});
		//$('style#datepicker-container').remove();
		//$('<style id="datepicker-container">.datepicker-container{width:' + ($(this).outerWidth() - 1) + 'px!important;}</style>').appendTo('head');
	});

	$("body").on("click", ".open_popup", function (e) {
		e.preventDefault();
		if ($(this).attr("data-target")) {
			$($(this).attr("data-target")).openPopup();
		}
	});

	$(".dropdown .title").click(function (e) {
		const el = $(this).parent();
		if(el.hasClass('active')){
			el.removeClass('active');
			$(document).off('click.dropdown');
		}
		else {
			if($(".dropdown.active").length>0){
				$(".dropdown.active .title").trigger('click');
			}
			el.addClass('active');
			setTimeout(()=>{
				$(document).one('click.dropdown',function(){
					el.removeClass('active');
				});
			},1);

		}
	});
	$('body').on('click',".dropdown .content",function (e) {
		e.stopPropagation();
	});
	$(".dropdown .sld button").click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		const input = $(this).parent().find('input');
		let v = input.val()*1;
		if($(this).hasClass('up')){
			v++;
		}
		else if(v>0){
			v--;
		}
		input.val(v);
	});

	$("body").on(
		"click",
		".popup button.close, .popup button.close_btn",
		function (e) {
			e.preventDefault();
			$(this)
				.closest(".popup")
				.closePopup();
		}
	);

	var header = $("#header");

	$(window).scroll(function () {
		if ($(window).scrollTop() > 90) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	});

	const media = window.matchMedia("(max-width: 991px)");
	mobileSupport(media);
	media.addListener(mobileSupport);
});

//popup
$.fn.openPopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		const opened_popup = $(".popup").filter(".show");

		if (opened_popup.length)
			opened_popup.closePopup();

		elem.addClass("show");
		setTimeout(() => elem.addClass("animate"), 1);
		elem.trigger("openPopup");
		elem
			.off("click.popup")
			.on("click.popup", function (e) {
					if ($(e.target).hasClass("popup"))
						elem.closePopup();
				}
			);
	}
};
$.fn.closePopup = function () {
	const elem = $(this);
	if (elem.length > 0) {
		elem.removeClass("animate");
		setTimeout(() => elem.removeClass("show"), 400);
		elem.trigger("closePopup");
	}
};

$.is_mobile = false;
const mobileSupport = (media) => {
	if (media.matches) {
		$.is_mobile = true;
		$(document).trigger("mobile_on");
		// $(".slider-type1 .btn-wrap").appendTo(".slider-type1 .slider-overlay");

		// $(".slider-type1 .btn-wrap").each(function(){
		// 	$(this).appendTo($(this).parent().find(".slider-overlay"));
		// });
	} else {
		$.is_mobile = false;
		$(document).trigger("mobile_off");
	}
};
