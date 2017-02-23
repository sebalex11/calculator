$(function(){

	var operands = ["+","-", "/", "x"]
	var $running = $("#running");
	var $digi = $("#digi");

//if you press a button this function handles the event

	$(".number").on("click", function(){
		
//set variables to make calling easier
		var buttonPressed = $(this).attr("data-num");
		var buttonNum= parseInt(buttonPressed);
		var digi = $("#digi").html();


//if the variables are 0 or a operator take it away and do numbers, else just put the numbers
		if( ($("#digi").html().indexOf("0") == 0) || (operands.indexOf($("#digi").html()) >= 0)){

			$("#digi").html(digi.slice(1) + buttonNum);	
		} else {
			$("#digi").html(digi + buttonNum);
		}

//if the number gets too long, kill it  

//>>>>>I HAVE TO PUT THIS FOR THE EQUALS FUNCTION TOO<<<<<

		if(digi.length >12){
			$("#digi").html("Limit Reached");
			setTimeout(function(){
				$("#digi").html("0")
			}, 1500)
		}
	})


//This handles the operator button event
	$(".operand").on("click", function(){
		var buttonPressed = $(this).attr("data-num");


//Testing area

/*
		console.log("this is what was in running last " +$running.html())
		console.log("this is the lenght of the last running " +$running.html().length)
		console.log("this is what the  last digit of running was " +$running.html()[$running.html().length -1])
*/

//if digi doesnt include an operator add the numbers from digi and append the operator. 
		if(operands.indexOf($digi.html()) < 0){
			$running.html($running.html()+$digi.html()+" "+buttonPressed+" ");
			$digi.html(buttonPressed);
		}
	})

//This is going to do the equals

$(".equals").on("click", function(){

//make sure the last digit was a number
	if(operands.indexOf($digi.html()) < 0){
	$running.html($running.html()+$digi.html());

//turn all entries into an array
	var total = $running.html().split(" ");
//start the calculations
	total = total.reduce(function(acc, val, ind){

//the first iteration sets the amount
		if(ind == 0){
			return parseInt(val);
		} else if(operands.indexOf(val)<0){
			var tempNum = parseInt(val);
			switch(total[ind-1]){
				case "+":
					return acc + tempNum;
					break;
				case "-":
					return acc - tempNum;
					break;
				case "/":
					return acc / tempNum;
					break;
				case "x": 
					return acc * tempNum;
					break;
			}
		} else {
			return acc;
		}
	},0)
	if(String(total).length > 12){
		
		$("#digi").html("Limit Reached");
		
		setTimeout(function(){
				$("#digi").html("0")
		}, 1500)
		$running.html("")
	} else {
		$digi.html(total);
		$running.html("")
	}


	}
})




})