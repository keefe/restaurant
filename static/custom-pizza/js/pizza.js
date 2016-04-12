     $('.pep').fadeToggle(1000);
     $('.green-pepper').fadeToggle(1000);
     $('.mushroom').fadeToggle(1000);
     var totalPrice = 10;
     var pepPrice = 1;
     var mushPrice = 1;
     var greenPrice = 1;
     var saucePrice = 3;
     var crustPrice = 5;
     var order = {
        hasPepperoni:false,
        hasBellPeppers:false,
        hasMushrooms:false,
        hasGlutenFree:false,
        hasCreamyGarlicWhite:false
     };
     $("#btnOrder").click(function(){
        console.log("Send " + JSON.stringify(order) + " to the server");
        var success = function(data){
            $("#inputs").append("<p> Request Done"+JSON.stringify(data)+"</p>");
        };
          
          $.ajax({
            type: "POST",
            url: "/pizzaParadise",
            data: JSON.stringify(order),
            success: success,
            dataType: "json",
            contentType: "application/json"
          });
     });

   	$('.btn-pepperonni').on('click', function(event) {
        event.preventDefault();
        order.hasPepperoni = !order.hasPepperoni;
        $('.btn-pepperonni').toggleClass('active');
        $('.pep').fadeToggle(1000);
        $('strong').empty();
        if ($('.btn-pepperonni').hasClass('active')){
			totalPrice -= pepPrice; 
   	        $('#pepperoni').remove();
        }
        else{
   	        totalPrice += pepPrice;
   	        $('#price-list').append('<li id="pepperoni"> Pepperoni: ' + '$' + pepPrice + '</li>');
        }
        $('strong').append("$");
        $('strong').append(totalPrice);
    });

    $('.btn-green-peppers').on('click', function(event) {
        event.preventDefault();
        order.hasBellPeppers = !order.hasBellPeppers;
        $('.btn-green-peppers').toggleClass('active');        
        $('.green-pepper').fadeToggle(1000);
        $('strong').empty();
        if ($('.btn-green-peppers').hasClass('active')){
			totalPrice -= greenPrice;
   	        $('#green-pepper').remove();
        }
        else{
   	        totalPrice += greenPrice;
   	        $('#price-list').append('<li id="green-pepper"> Green Pepper: ' + '$' + greenPrice + '</li>');
        }
        $('strong').append("$");
        $('strong').append(totalPrice);

    });

    $('.btn-mushrooms').on('click', function(event) {
        event.preventDefault();
        order.hasMushrooms = !order.hasMushrooms;

        $('.btn-mushrooms').toggleClass('active');        
        $('.mushroom').fadeToggle(1000);
        $('strong').empty();
        if ($('.btn-mushrooms').hasClass('active')){
			totalPrice -= mushPrice;
   	        $('#mushroom').remove();
        }
        else{
   	        totalPrice += mushPrice;
   	        $('#price-list').append('<li id="mushroom"> Mushroom: ' + '$' + mushPrice + '</li>');
        }
        $('strong').append("$");
        $('strong').append(totalPrice);

    });

    $('.btn-crust').on('click', function(event) {
        event.preventDefault();
        order.hasGlutenFree = !order.hasGlutenFree;
        $('.btn-crust').toggleClass('active');        
        $('.crust').toggleClass('crust-gluten-free');
        $('strong').empty();
        if ($('.btn-crust').hasClass('active')){
			totalPrice -= crustPrice;
   	        $('#crust').remove();
        }
        else{
   	        totalPrice += crustPrice;
   	        $('#price-list').append('<li id="crust"> Crust: ' + '$' + crustPrice + '</li>');   	        
        }
        $('strong').append("$");
        $('strong').append(totalPrice);

    });

     $('.btn-sauce').on('click', function(event) {
        event.preventDefault();
        order.hasCreamyGarlicWhite = !order.hasCreamyGarlicWhite;
        $('.btn-sauce').toggleClass('active');
        $('.sauce').toggleClass('sauce-white');
        $('strong').empty();
        if ($('.btn-sauce').hasClass('active')){
			totalPrice -= saucePrice;
   	        $('#sauce').remove();			
        }
        else{
   	        totalPrice += saucePrice;
   	        $('#price-list').append('<li id="sauce"> Garlic Sauce: ' + '$' + saucePrice  + '</li>');
        }
        $('strong').append("$");        
        $('strong').append(totalPrice);
    });

