$(document).ready(function(){
		var winW = $(window).width();
		var winH = $(window).height();
		$('#sequence-theme #sequence').width(winW).height(winH);	
		$('#sequence-theme #sequence ul  li.slide').width(winW).height(winH);	
		$('.bgWhite').height(winH);
		
		var route = $('.sliderRoute').height();
		$('.nav li:last').addClass('last');
		$('.bottSliderNav').css('margin-left', $(window).width() / 2 - $('.bottSliderNav').width() / 2);
		
		/**********************/
		var bgW = $('.bgWhite').width();
		//alert(bgW);
		$('.logo').offset({ left: winW/2-bgW/2+50});
		$('.service').offset({ left: winW-bgW});
		$('.tools').offset({ left: winW-bgW+160});
		$('.port').offset({ left: winW-bgW+320});
		$('.process').offset({ left: winW-bgW+480});
    
    var options = {
        animateStartingFrameIn: true,
        autoPlay: false,
		autoPlayDelay: 3000,
        preloader: true,
        pauseOnHover:false,
        preloadTheseFrames: [1,2,3,4,5,6],
        preloadTheseImages: [
            "images/dot.png"
            //"images/tn-model3.png",
            //"images/tn-model4.png",
            //"images/tn-model5.png"
        ]
    };
    
    var sequence = $("#sequence").sequence(options).data("sequence");

    sequence.afterLoaded = function() {
        $("#sequence-theme .nav").fadeIn(100);
        $("#sequence-theme .nav li:nth-child("+(sequence.settings.startingFrameID)+") img").addClass("active");
    }

    sequence.beforeNextFrameAnimatesIn = function() {
        $("#sequence-theme .nav li:not(:nth-child("+(sequence.nextFrameID)+")) img").removeClass("active");
        $("#sequence-theme .nav li:nth-child("+(sequence.nextFrameID)+") img").addClass("active");
    }
    
    $("#sequence-theme").on("click", ".nav li", function() {
        $(this).children("img").removeClass("active").children("img").addClass("active");
        sequence.nextFrameID = $(this).index()+1;
        sequence.goTo(sequence.nextFrameID);
		
		//alert(sequence.nextFrameID);
		if(sequence.nextFrameID == 1){
			$('.bottSliderNav span').removeClass().addClass('birdBott stepHome');
			}
		if(sequence.nextFrameID == 2){
			$('.bottSliderNav span').removeClass().addClass('birdBott stepService');
			}
		if(sequence.nextFrameID == 3){
			$('.bottSliderNav span').removeClass().addClass('birdBott stepTools');
			}
		if(sequence.nextFrameID == 4){
			$('.bottSliderNav span').removeClass().addClass('birdBott stepPort');
			}
		if(sequence.nextFrameID == 5){
			$('.bottSliderNav span').removeClass().addClass('birdBott stepProcess');
			}
    });
	
 $("#sequence-theme .logo").click(function(){$(".bHome").trigger('click');});
 $("#sequence-theme .service").click(function(){$(".bService").trigger('click');});
 $("#sequence-theme .tools").click(function(){$(".bService").trigger('click');});
 $("#sequence-theme .port").click(function(){$(".bPort").trigger('click');});
 $("#sequence-theme .process").click(function(){$(".bProcess").trigger('click');});
	
 $("#sequence-theme .mainNav").hover(function () {
		$(this).find('span.tag').slideDown('slow');
	},function () {
		$('#sequence-theme .mainNav span.tag').slideUp('fast');
	});
	$('.portCont ul.leftTabLinks li').click(function(){
	if($(this).hasClass('act')){
		return;
		}
		else{
		var $id = $(this).closest('div');
		var ss = $id.find(".leftTabLinks li").index(this);
		
		$id.find(".leftTabLinks li").removeClass('act');
		$(this).addClass('act');
		
		$id.find(".portDataCont div.tabCont").slideUp().removeClass('show');
		$id.find(".portDataCont div.tabCont").eq(ss).slideDown();												 
		}
		});
	
	
	$('.bxslider').bxSlider({
		pagerCustom: '#bx-pager'
	});
	
	
	$('.portDataCont .bxslider li span.descArw').click(function(){
		$(this).toggleClass('act');
		$(this).prev('div.desc').toggleClass('act');
		
		
	})
});