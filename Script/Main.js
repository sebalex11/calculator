$(function(){

	$(".number").on("click", function(){
		

		var buttonPressed = $(this).attr("data-num");
		var buttonNum= parseInt(buttonPressed);
		var digi = $("#digi").html();



		if( $("#digi").html().indexOf("0") == 0){

			$("#digi").html(digi.slice(1) + buttonNum);	
		} else {
			$("#digi").html(digi + buttonNum);
		}

		if(digi.length >12){
			$("#digi").html("Limit Reached");
			setTimeout(function(){
				$("#digi").html("0")
			}, 1500)
		}
	})
})