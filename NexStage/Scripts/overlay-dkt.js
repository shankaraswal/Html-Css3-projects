(function($){
	$.fn.shan = function(options) {
/***************************/
		var
		  defaults = {
			overlayDiv: '',
			mBackgroundColor:"#000",
			position:"absolute",
			mLeft:0,
			mTop:0,
			zIndex:9000,
			dWidth: 500,
			dHeight: 300,
			iHeight: 30,
			dBorderWidth:5,
			dBorderColor:'#ccc',
			dBorderStyle:'solid',
			dBorderRadius:10
		  },
		  settings = $.extend({}, defaults, options);
		    this.each(function() {
					var $this = $(this);			   
						$this.click(function(e) {
										 
						//Get the window height and width
						var winH = $(document).height();
						var winW = $(window).width();
						var iSrc = 	$(this).attr('lang');
						var	lShift = settings.dBorderWidth+settings.dBorderRadius;
						
						e.preventDefault();
						
						$("<div id='mask'></div>")
						 .appendTo("body")
						 .show()
						 .height(winH)
						 .width(winW)
						.fadeTo("slow",0.6)
						.fadeIn(700)
						.css({
								backgroundColor: settings.mBackgroundColor,
								position: settings.position,
								left: settings.mLeft,
								top: settings.mTop,
								zIndex: settings.zIndex,
						  });	
						//Set the popup window to center
						$("body").css("overflow", "hidden");
						
						//iframe/div values
						 $("<div class='window' id='dialog'><img src='Images/icn-close.gif' align='right' class='closeOL' id='closeOL' /><div class='scrollArea' id='scrollArea'></div></div>")
						 .appendTo("body")
						 .show()
						 .css({
								height: settings.dHeight,
								width: settings.dWidth,
								position: settings.position,
								borderWidth: settings.dBorderWidth,
								borderColor: settings.dBorderColor,
								borderStyle: settings.dBorderStyle,
								borderRadius: settings.dBorderRadius,
								padding: settings.dBorderRadius,
								zIndex: settings.zIndex
						  });
						  
						var d = $('#dialog'); 
						d.css("top", (( $(window).height() -   d.height() ) / 2 + $(window).scrollTop())-lShift + "px");
						d.css("left", (( $(window).width() -   d.width() ) / 2 +$(window).scrollLeft())-lShift + "px");
						
						$(window).resize(function () {
							var m = $('#mask'); 
							var winHnw = $(window).height();
							var winWnw = $(window).width();
							m.css({width: winWnw, height:winHnw});
							
							d.css("top", (( $(window).height() -   d.height() ) / 2+$(window).scrollTop())-lShift + "px");
							d.css("left", (( $(window).width() -   d.width() ) / 2+$(window).scrollLeft())-lShift + "px");
						});

						 
				 		
						 var c = $('#' + settings.overlayDiv).html();
						 
						//alert(c);
						
					   $("#scrollArea").append(c)
					   	.css({
								height: settings.dHeight-settings.iHeight,
								backgroundColor: 'none',
								overflow: 'auto',
								marginTop:'25px'
								
							});
						
				$('#' + settings.overlayDiv).empty();
						 
				  $("#closeOL").css({cursor: 'pointer', margin: '0 0'});
				  
				//if close button is clicked
				$('#closeOL, .closeOL').click(function (e) {
														
							//Cancel the link behavior
							e.preventDefault();
							//$('#iframe').attr('src', '');
							window.parent.$("#dialog").detach();
							$('#mask, #dialog').fadeOut(600, function(){ $(this).remove();});
							$("body").css("overflow", "hidden");
							$('#' + settings.overlayDiv).html(c);

					});		
					
				$(document).keyup(function(e) {
						  if (e.keyCode == 27) { 
							//Cancel the link behavior
							e.preventDefault();
							//$('#iframe').attr('src', '');
							window.parent.$("#dialog").detach();
							$('#mask, #dialog').fadeOut(600, function(){ $(this).remove();});
							$("body").css("overflow", "hidden");
						  }
					});	


					});	
		});	
	
	/*****************************************/
	}
})(jQuery);