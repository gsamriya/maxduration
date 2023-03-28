$(function(){
	
	//this is just to create a table
	function addrow(){
		$("tbody").append('<tr> <td> <div class="form-group"> <input type="number" class="form-control timenumfield" placeholder="TimeNumber"> </div> </td> <td> <div class="form-group"> <input type="number" class="form-control tempoutsidefield" placeholder="TempOutside"> </div></td> <td> <div class="form-group"> <input type="number" class="form-control quantmilkfield" placeholder="QuantMilk"> </div></td> <td> <div class="form-group"> <input type="number" class="form-control sizebigfield" placeholder="SizeBagBig"> </div> </td> <td><div class="form-group"> <input type="number" class="form-control sizesmallfield" placeholder="SizeBagSmall"></div></td> <td><div class="form-group"> <input type="number" class="form-control carfield" placeholder="Car"></div></td> <td><div class="form-group"> <input disabled="disabled" class="disabled form-control tvfield" placeholder="TempRise"> </div> </td></tr>');
	}

	for(var i = 0; i < 5; i++){
		addrow();
	}
	
	//Handler for basic RPC
	$("#scorebutton").click(function(e){
		e.preventDefault()
		$(".tvfield").val("")
		var data = [];
		$("tbody tr").each(function(i){
			data[i] = {
				TimeNumber : parseFloat($(this).find(".timenumfield").val()),
				TempOutside : parseFloat($(this).find(".tempoutsidefield").val()),
				QuantMilk : parseFloat($(this).find(".quantmilkfield").val()),
				SizeBagBig : parseFloat($(this).find(".sizebigfield").val()),
				SizeBagSmall : parseFloat($(this).find(".sizesmallfield").val()),
				Car : parseFloat($(this).find(".carfield").val())
			};
		});
		
		//RPC request to score data
		var req = ocpu.rpc("tv", {input : data}, function(output){
			//repopulate the table
			$("tbody tr").each(function(i){
				$(this).find(".timenumfield").val(output[i].timenumber);
				$(this).find(".tempoutsidefield").val(output[i].tempoutside);
				$(this).find(".quantmilkfield").val(output[i].quantmilk);
				$(this).find(".sizebigfield").val(output[i].sizebagbig);
				$(this).find(".sizesmallfield").val(output[i].sizebagsmall);
				$(this).find(".carfield").val(output[i].car);
				$(this).find(".tvfield").val(output[i].tv);
			});
		}).fail(function(){
			alert(req.responseText);
		});
	});

	//CSV file scoring
	$("#csvfile").on("change", function loadfile(e){
		if(!$("#csvfile").val()) return;
		$("#outputcsv").addClass("hide").attr("href", "");
		$(".spinner").show()
		var req = ocpu.call("tv", {
			input : $("#csvfile")[0].files[0]
		}, function(tmp){
			$("#outputcsv").removeClass("hide").attr("href", tmp.getLoc() + "R/.val/csv")
		}).fail(function(){
			alert(req.responseText)
		}).always(function(){
			$(".spinner").hide()
		});
	});

	//update the example curl line with the current server
	$("#curlcode").text(
		$("#curlcode").text().replace(
			"https://public.opencpu.org/ocpu/github/opencpu/tvscore/R/tv/json", 
			window.location.href.match(".*/tvscore/")[0] + "R/tv/json"
		)
	);

});
