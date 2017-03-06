$(function(){

	var operands = ["+","-", "/", "x"]
	var $running = $("#running");
	var $digi = $("#digi");
	var exe;


	var clearAll = function(){
		if($running.html().length >0 || $digi.html().length > 0){
			$running.html("");
			$digi.html("");
		}
	}

	var checkDecimal = 	function(){

							if($digi.html().indexOf(".") < 0 && operands.indexOf($digi.html()) < 0){
								finisher();
								if($digi.html().length >12){
									$("#digi").html("Limit Reached");
									setTimeout(function(){
										$("#digi").html("0")
									}, 1500)
								} else {
									$digi.html($digi.html()+".")
									}
							}
						}


	var clear = 	function(){
						if($digi.html().length >0 && operands.indexOf($digi.html()) < 0){
							$digi.html("");
						}
					}


	var finisher = function(){
				if(exe == "finished" && $running.html().length < 1){
			console.log($running.html().length)
			exe = "";
			clearAll();
		}
	}

//if you press a button this function handles the event

	$(".number").on("click", function(){

		console.log(exe)
		console.log($digi.html())

//checks if it is finished
	finisher()

//set variables to make calling easier
		var buttonPressed = $(this).attr("data-num");
		var buttonNum = buttonPressed;
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
		
//If digi doesnt include an operator add the numbers from digi and append the operator. 
		if(operands.indexOf($digi.html()) < 0){
			$running.html($running.html()+$digi.html()+" "+buttonPressed+" ");
			$digi.html(buttonPressed);
		}
	})

//This is going to handle the "equals" button

$(".equals").on("click", function(){

//make sure the last digit was a number
	if(operands.indexOf($digi.html()) < 0){
	$running.html($running.html()+$digi.html());

//turn all entries into an array
	var total = $running.html().split(" ");

//start the calculations
	total = total.reduce(function(acc, val, ind){
console.log(parseFloat(val));
//the first iteration sets the amount
		if(ind == 0){
			return parseFloat(val);
		} else if(operands.indexOf(val)<0){
			var tempNum = parseFloat(val, 10);
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
		console.log(String(total))
		$("#digi").html("Limit Reached");
		
		setTimeout(function(){
				$("#digi").html("0")
		}, 1500)
		$running.html("")
	} else {
		$digi.html(total);
		$running.html("")
	}
	exe = "finished"

	}
 })

//EVENTS

	$(".clear").on("click", clear)
 
	$(".clearAll").on("click", clearAll)


	$(".decimal").on("click", checkDecimal)

})