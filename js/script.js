$(document).ready(function($){

	var slideCount= $('.slider li').length;
	var slideWidth= $('.slider li').width();
	var sliderWidth= slideCount*slideWidth;
	var animating=0;

	$('.slider').css({width: sliderWidth});

	function complete(){
		$(".type").css("color", "");
		$(".type").css({ color: $('.active').data('color') });
		$(".type").hide().html($('.active').data('specific')).fadeIn(400);
    	$(".gallery_active").hide().html( $('.active').data('type')).fadeIn(400);
    	animating=0; 
	}

	function slide(move){
		$('.slider').animate(
			{ left: "+="+move*slideWidth },
			{
				duration: 500,
				complete: function(){ complete() }
			}
		);
	}

	function goToFirst(){
		$('.slider').animate(
			{ left: 0 },
			{
				duration: 500,
				complete: function(){ complete() }
			}
		);
	}

	function goToLast(){
		$('.slider').animate(
			{ left: -sliderWidth+slideWidth },
			{
				duration: 500,
				complete: function(){ complete() }
			}
		);
	}

	$('.left').click(function(){
		if(animating==0){
			animating=1;
			if($(".slider li:first-child").hasClass("active")){
				$('.active').removeClass();
				$(".slider li:last-child").addClass("active");
				goToLast();
			}else{
				$('.active').removeClass(function(){
					$(this).prev().addClass("active");
					return "active";
				});
				slide(1);
			}
		}
	});

	$('.right').click(function(){
		if(animating==0){
			animating=1;
			if($(".slider li:last-child").hasClass("active")){
				$('.active').removeClass();
				$(".slider li:first-child").addClass("active");
				goToFirst();
			}else{
				$('.active').removeClass(function(){
					$(this).next().addClass("active");
					return "active";
				});
			slide(-1);
			}
		}
	});

	$('.back, .gallery').click(function(){
		if(!($(".slider li:first-child").hasClass("active"))){
			$('.active').removeClass();
			$(".slider li:first-child").addClass("active");
			goToFirst();
		}
	});

});