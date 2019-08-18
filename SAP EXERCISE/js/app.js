$(document).foundation();

/*global jslint, jQuery, ATT, document, setTimeout, window */


var ATT = (function (){
		var init,
		loadAndApplyJson,
		addItemInCart,
		setIteminCart,
		setPrice,
		viewItemDetail,
		editItemDetail,
		count = 0;
		
	loadAndApplyJson = function () {
		$.getJSON('data.json', function(data){
			var prodArr = {};
			$.each(data.products, function(a, b){
				var prodId, prodName, style, Color, price, discount, qty, size, url; 
				prodId = b.prodId;
				prodName = b.prodName;
				style = b.style;
				color = b.color;
				netPrice = b.netPrice;
				price = b.price;
				qty = b.qty;
				size = b.size;
				url = b.url;
				$('.listBucket').append('<div class="row listRow"><div class="medium-6 row"><div class="medium-4 columns"><a href="#" data-open="viewModal" data-prod-id="'+prodId+'"><img src="'+url+'"></a></div><div class="medium-8 row columns"><h4>'+prodName+'</h4> <p>Style: '+style+'</p><p>Color: '+color+'</p> <p class="disPrice hide"><sup>$</sup><span class="">'+price+'</span></p> <p class="price"> <sup>$</sup><span>'+netPrice+'</span></p> <div class="row ctaBucket hide-for-small-only"> <span class="medium-3 columns"><a href="#" class="edit" data-open="editModal" data-prod-id="'+prodId+'">EDIT</a></span> <span class="medium-4 columns" data-prod-id="'+prodId+'">X REMOVE</span> <span class="medium-5 columns" data-prod-id="'+prodId+'">SAVE FOR LATER</span> </div> </div> </div> <div class="medium-2 columns text-center size hide-for-small-only">'+size+'</div> <div class="medium-2 columns text-center qty hide-for-small-only">'+qty+'</div> <div class="medium-2 columns text-right priceCol hide-for-small-only"> <p class="disPrice"><sup>$</sup><span class="">'+price+'</span></p><p class="price"><sup>$</sup><span class="">'+netPrice+'</span></p></div></div>');
			});
		});
	};
	
	addItemInCart =function () {
		$.getJSON('data.json', function(data){
			prodId = data.products[count].prodId;
			prodName = 'New ' + data.products[count].prodName;
			style = data.products[count].style;
			color = data.products[count].color;
			netPrice = data.products[count].netPrice;
			price = data.products[count].price;
			qty = data.products[count].qty;
			size = data.products[count].size;
			url = data.products[count].url;
			$('.listBucket').append('<div class="row listRow"><div class="medium-6 row"><div class="medium-4 columns"><a href="#" data-open="viewModal" data-prod-id="'+prodId+'"><img src="'+url+'"></a></div><div class="medium-8 row columns"><h4>'+prodName+'</h4> <p>Style: '+style+'</p><p>Color: '+color+'</p> <p class="disPrice hide"><sup>$</sup><span class="">'+price+'</span></p> <p class="price"> <sup>$</sup><span>'+netPrice+'</span></p> <div class="row ctaBucket hide-for-small-only"> <span class="medium-3 columns"><a href="#" class="edit" data-open="editModal" data-prod-id="'+prodId+'">EDIT</a>EDIT</a></span> <span class="medium-4 columns" data-prod-id="'+prodId+'">X REMOVE</span> <span class="medium-5 columns" data-prod-id="'+prodId+'">SAVE FOR LATER</span> </div> </div> </div> <div class="medium-2 columns text-center size hide-for-small-only">'+size+'</div> <div class="medium-2 columns text-center qty hide-for-small-only">'+qty+'</div> <div class="medium-2 columns text-right priceCol hide-for-small-only"> <p class="disPrice"><sup>$</sup><span class="">'+price+'</span></p><p class="price"><sup>$</sup><span class="">'+netPrice+'</span></p></div></div>');
			if(count == 2){
				count=0;
			}
			else{
				count++
			}
		});	
		
		setTimeout(function(){
			setIteminCart();
		}, 500);
	};
	
	setIteminCart = function () {
		var itemCount = [], totalItem = 0;
		$('.listRow').find('.qty ').each(function(){
			 itemCount.push($(this).html());									   
		});
		for (var i = 0; i < itemCount.length; i++) {
			totalItem += Number(itemCount[i]);
		};
		$('.cartItem').html(totalItem);
		setTimeout(function(){
			setPrice(totalItem);
		}, 500);
		
	};

	setPrice = function (totalItem) {
		var itemPrice = [], totalPrice = 0, shipAmount=0,calcPrice=0, getsubTotal, applyDiscount, getShipping, newPrice, autoDiscount=true;
		//calculating SUBTOTAL price
		console.log('Total Item in Cart: ' + totalItem);

		getsubTotal=(function(){
				$('.priceCol').find('.price').each(function(){
					 itemPrice.push($(this).find('> span').html());
				});
				for (var i = 0; i < itemPrice.length; i++) {
					totalPrice += Number(itemPrice[i]);
				}
				$('.subtotalBar .price > span').html(totalPrice.toFixed(2));
				console.log('Subtotal Amount: '  + totalPrice);
			})();

			
		//calculating ESTIMATED SHIPPING
		getShipping =(function(){
				//console.log( 'shipAmount =' + shipAmount);
			})();
		
		//calculating DISCOUNT
		applyDiscount =(function(){
				var discountPer=$('.couponBar input').val(), discountPrice=0, discountAmout=0, disPer=0;

				if(discountPer === 'OFF10PER' || (totalItem > 0 && totalItem <4 )){
					disPer=10;
				}	
				if(discountPer === 'OFF20PER'  || (totalItem > 3 && totalItem <7)){
					disPer=20;
				}	
				if(discountPer === 'OFF30PER'  || (totalItem > 6)){
					disPer=30;
				}
				discountAmout =totalPrice*disPer/100;
				discountPrice = Number(totalPrice-discountAmout);

				console.log("Discount Percent: "+disPer+"\nDiscount Amount: "+discountAmout+"\nEstimated Amount: "+discountPrice); 

				$('.promoBar .disLbl').html('DISCOUNT '+disPer+' %');
				$('.promoBar .price > span').html(discountAmout.toFixed(2));
				$('.totalBar .price > span').html((discountPrice).toFixed(2));
				discountPer=$('.couponBar input').val('')
			})();
		
		//calculating ESTIMATED TOTAL
		newPrice =(function(){
				//calcPrice = totalPrice-discountPer;
			//	$('.totalBar .price > span').html(calcPrice.toFixed(2));
			//	return calcPrice;
			})();
	
		};
	
	viewItemDetail =function (prodId) {
		var $modal = $('#viewModalCont');
		$.getJSON('data.json', function(data){
		  for(var i = 0, len = data.products.length; i < len; i++) {
				if (data.products[i].prodId === prodId) {
					index = i;
					break;
				}
			}
			prodId = data.products[index].prodId;
			prodName = data.products[index].prodName;
			style = data.products[index].style;
			color = data.products[index].color;
			netPrice = data.products[index].netPrice;
			price = data.products[index].price;
			qty = data.products[index].qty;
			size = data.products[index].size;
			url = data.products[index].url;
		})		  		 
		 .done(function(){
			$modal.empty().append('<div class="row"><h4>'+prodName+'</h4><div class="columns medium-8"><p class="price">Price: <sup>$</sup><span><strong>'+netPrice+'</strong></span></p><div class="viewRow row"><p class="medium-6 columns">Qty: '+qty+'</p><p class="medium-6 columns">Size: '+size+'</p><p class="medium-6 columns">Style: '+style+'</p><p class="medium-6 columns">Color: '+color+'</p></div></div><div class="columns medium-4"><img src="'+url+'"></div></div><div class="row align-center"></div>');
		 });
	};

	editItemDetail =function (prodId) {
			var $modal = $('#editModalCont');
			$.getJSON('data.json', function(data){
				for(var i = 0, len = data.products.length; i < len; i++) {
					if (data.products[i].prodId === prodId) {
						index = i;
						break;
					}
				}
				prodId = data.products[index].prodId;
				prodName = data.products[index].prodName;
				style = data.products[index].style;
				color = data.products[index].color;
				netPrice = data.products[index].netPrice;
				price = data.products[index].price;
				qty = data.products[index].qty;
				size = data.products[index].size;
				url = data.products[index].url;
			})	
		 .done(function(){
			$modal.empty().append('<div class="row"> <h4>'+prodName+'</h4> <div class="columns medium-8"> <p class="price">Price: <sup>$</sup><span><strong>'+netPrice+'</strong></span></p><div class="viewRow row"> <p class="medium-6 columns">Style: '+style+'</p></div><div class="row editRow"> <p class="columns medium-4 selectColor"> <select> <option value="red">RED</option> <option value="black">BLACK</option> <option value="pink">PINK</option> <option value="white">WHITE</option> <option value="blue">BLUE</option> <option value="multi">MULTI</option> </select> </p><p class="columns medium-4 selectSize"> <select> <option value="S">S</option> <option value="M">M</option> <option value="L">L</option> <option value="XL">XL</option> <option value="XXL">XXL</option> </select> </p><p class="columns medium-4 selectQty"> <select> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </p></div></div><div class="columns medium-4"><img src="'+url+'"></div></div><div class="row align-center"> <button class="alert button column medium-4 small-12" id="editProd">EDIT</button></div>');
		 })
		 .complete(function(){
			$('.selectColor select > option').each(function() {
				var sc=  $(this).val();
				if(sc = color){
					$('[value='+color+']').attr('selected','selected');
				}
			});
			
			
			$('.selectQty select > option').each(function() {
				var qt=  $(this).val();
				if(qt = qty){
					$('[value='+qty+']').attr('selected','selected');
				}
			});

			$('.selectSize select > option').each(function() {
				var sz=  $(this).val();
				if(sz = size){
					$('[value='+size+']').attr('selected','selected');
				}
			});
			
		 });

	};


	return {
		loadAndApplyJson: loadAndApplyJson,
		addItemInCart: addItemInCart,
		setIteminCart: setIteminCart,
		setPrice: setPrice,
		viewItemDetail: viewItemDetail,
		editItemDetail: editItemDetail
	  };	
	})();
	
	$(document).ready(function(){
		//ATT.loadAndApplyJson();
		setTimeout(function(){
			ATT.setIteminCart();
		}, 500);
		$('#addItem').on('click', function(e){
				e.preventDefault();
				ATT.addItemInCart();
		})
		$('#applyDiscount').on('click', function(e){
				e.preventDefault();
				ATT.setPrice();
		})
		 $(document).on("click",".listRow a",function(e){
				e.preventDefault();
				ATT.viewItemDetail($(this).data("prod-id"));
		})
		 $(document).on("click",".ctaBucket a.edit",function(e){
				e.preventDefault();
				ATT.editItemDetail($(this).data("prod-id"));
		})
	})
	
	
$(function () {
  // Grab the template script
  var theTemplateScript = $("#shan").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // This is the default context, which is passed to the template
  var context = {
	"products": [
				{
				"prodId": "PROD1001",
				"prodName": "SOLID GREEN COTTON TSHIRT",
				"style": "MS13KT1906",
				"color": "black",
				"netPrice": "200.00",
				"price": "225.00",
				"qty":"1",
				"size": "XL",
				"url": "assets/T1.jpg"
				},
				
				
				{
				"prodId": "PROD1002",
				"prodName": "SOLID GREEN COTTON TSHIRT",
				"style": "MS13KT1906",
				"color": "pink",
				"netPrice": "300.00",
				"price": "350.00",
				"qty":"1",
				"size": "M",
				"url": "assets/T2.jpg"
				},
				
				{
				"prodId": "PROD1003",
				"prodName": "SOLID GREEN COTTON TSHIRT",
				"style": "MS13KT1906",
				"color": "multi",
				"netPrice": "600.00",
				"price": "500.00",
				"qty":"1",
				"size": "L",
				"url": "assets/T3.jpg"
				}
				]
	}

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.listBucket').append(theCompiledHtml);
});

