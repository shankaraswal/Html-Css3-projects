// JavaScript Document

$(document).ready(function(){
	$('.bxslider li').eq(0).addClass('imgSlide1');
	$('.bxslider li').eq(1).addClass('imgSlide2');
	$('.bxslider li').eq(2).addClass('imgSlide3');
	$('.bxslider li').eq(3).addClass('imgSlide4');
	$('.bxslider li').eq(4).addClass('imgSlide5');
	$('.bxslider li').eq(5).addClass('imgSlide6');

	function rightColH(){
	//**************
	var winH = $(window).height();
	var winW = $(window).width();
	var docH = $(document).height();
	var rightCW = $('#rightCol').width();
	var leftCW = winW-rightCW;

	//alert(winW);	
		$('#wrapper').width(winW);
		$('#leftCol').width(leftCW-1);
		$('#rightCol').height(docH).css({top:0, right:0, position:'fixed'});			   
		$('.slideCont').height(winH);
		$('.bxslider li').height(winH);
		$('.bx-wrapper .bx-prev, .bx-wrapper .bx-next').css({top:winH/2})
				$('div.slideText').css({marginTop:winH/2-$('div.slideText').height()/2})
		 var ax=$(".aboutCont").offset();
		 $(".lower").css({left: ax.left});
			$('div.teamCont').css({marginTop:winH/2-$('div.teamCont').height()/2})
			$('ul.pentagonContainer li').each(function(){
				$(this).find('span').css({marginTop:$(this).height()/2-$(this).find('span').height()/2})
				});
			$('div.submitForm p').css({marginTop:winH/2-100})
		}
	
	
	var actImg ='<img src="Images/img-link-active.png" id="act" class="act" />';

	$('#nav li').remove('#act');
	$('#linkHome').append(actImg);

	var slide =1;
	$("#linkHome").click(function(){$('html, body').animate({scrollTop: $("#home").offset().top}, 1000);$("#map").slideUp('slow');$('#nav li .act').remove();$('#linkHome').append(actImg);slide =1;});	
	$("#linkAbout, .aboutCont h1").click(function(){$('html, body').animate({scrollTop: $("#about").offset().top}, 1000);$("#map").slideUp('slow');$('#nav li .act').remove();$('#linkAbout').append(actImg);slide =2;});	
	$("#linkTeam, .teamCont").click(function(){$('html, body').animate({scrollTop: $("#team").offset().top}, 1000);$("#map").slideUp('slow');$('#nav li .act').remove();$('#linkTeam').append(actImg);slide =3;});	
	$("#linkContact").click(function(){$('html, body').animate({scrollTop: $("#contact").offset().top}, 1000);$("#map").slideUp('slow');$('#nav li .act').remove();$('#linkContact').append(actImg);slide =4;});
	$(".linkBar").click(function(){$('html, body').animate({scrollTop: $("#contact").offset().top}, 1000);$("#map").slideUp('slow');$('#nav li .act').remove();$('#linkContact').append(actImg);slide =4;
				$(".tabs li.submit").trigger('click')
				});	
	
		$("#locDelhi").click(function(){
			$("#map").slideDown();
			$(".mapDel").show();
			$(".mapMum").hide();
			$('html, body').animate({scrollTop: $("#map").offset().top}, 1000)
			slide =5;
			  });	
		$("#locMumbai").click(function(){
			$("#map").slideDown('');
			$(".mapMum").show();
			$(".mapDel").hide();
			$('html, body').animate({scrollTop: $("#map").offset().top}, 1000)
			slide =6;
			  });	
		
			$(".tabs li.contact").click(function(){
				$('.contact').addClass('on');
				$('.submit').removeClass('on');
				$('.submitForm').hide();
				$('.contactForm').slideDown();
			 });
			
			$(".tabs li.submit").click(function(){
				$('.submit').addClass('on');
				$('.contact').removeClass('on');
				$('.contactForm').hide();
				$('.submitForm').slideDown();
			 });
		$("#pageUp").click(function(){
					if(slide == 2){$("#linkHome").trigger('click');slide =1; return};
					if(slide == 3){$("#linkAbout").trigger('click');slide =2; return};
					if(slide == 4){$("#linkTeam").trigger('click');slide =3; return};
					if(slide == 5){$("#linkContact").trigger('click');slide =4; return};
					if(slide == 6){$("#linkContact").trigger('click');slide =4; return};
				});	

	$("#pageDown").click(function(){
				if(slide == 1){$("#linkAbout").trigger('click');slide =2; return};
				if(slide == 2){$("#linkTeam").trigger('click');slide =3; return};
				if(slide == 3){$("#linkContact").trigger('click');slide =4; return};
			});	

	$('.emp1').hover(function(){
			$('.empDtl').hide();
			$('#emp1').show();
		});
	$('.emp2').hover(function(){
			$('.empDtl').hide();
			$('#emp2').show();
		});
	$(window).bind('resize', function(){
		rightColH();
		//$("#linkHome").trigger('click');
	});
	rightColH();
	$('.bxslider').bxSlider({
		mode: 'horizontal',
		auto: true,
		pause: 4000,
		autoStart: true
	});
	$('.emp1, #razdan').shan({overlayDiv: 'empDesc-1'});
	$('.emp2, #jog').shan({overlayDiv: 'empDesc-2'});

/*** end document ready ***/
});

$(window).load(function(){
	var winH = $(window).height();
	$('.bx-wrapper .bx-prev, .bx-wrapper .bx-next').css({top:winH/2})
});