$(function(){
	//Handler for basic RPC
	$("#scorebutton").click(function(e){
		e.preventDefault()
		$(".TempRisefield").val("")
		var data = [];
			};
		});
		
		//RPC request to score data
		var req = ocpu.rpc("tv", {input : data}, function(output){
		$("tbody tr").each(function(i){
			data[i] = {
				TimeNumber : parseFloat($(this).find(".TimeNumberfield").val()),
				TempOutside : $(this).find(".TempOutsidefield").val(),
				QuantMilk : $(this).find(".QuantMilkfield").val(),
				Car : $(this).find(".Carfield").val(),
				SizeBagBig : $(this).find(".SizeBagBigfield").val(),
				SizeBagSmall : $(this).find(".SizeBagSmallfield").val(),
				TempRise : $(this).find(".TempRisefield").val()
			//repopulate the table
			$("tbody tr").each(function(i){
				$(this).find(".TimeNumberfield").val(output[i].TimeNumber);
				$(this).find(".TempOutsidefield").val(output[i].TempOutside);
				$(this).find(".QuantMilkfield").val(output[i].QuantMilk);
				$(this).find(".Carfield").val(output[i].Car);
				$(this).find(".QuantMilkfield").val(output[i].QuantMilk);
				$(this).find(".SizeBagBigfield").val(output[i].SizeBagBig);
				$(this).find(".SizeBagSmallfield").val(output[i].SizeBagSmall);
				$(this).find(".TempRisefield").val(output[i].TempRise);
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

	//this is just to create a table
	function addrow(){
		$("tbody").append('<tr> <td> <div class="form-group"> <input type="number" class="form-control TimeNumberfield" placeholder="TimeNumber"> </div> </td> <td> <div class="form-group"> <input type="number" class="form-control TempOutsidefield" placeholder="TempOutside"> </div> </td> <td> <div class="form-group"> <input type="number" class="form-control QuantMilkfield" placeholder="QuantMilk"> </div> </td> <td> <div class="form-group"> <input type="number" class="form-control SizeBagBigfield" placeholder="SizeBagBig"> </div> </td> <td> <div class="form-group"> <input type="number" class="form-control SizeBagSmallfield" placeholder="SizeBagSmall"> </div> </td> <td> <div class="form-group"> <input disabled="disabled" class="disabled form-control TempRisefield" placeholder="TempRise"> </div> </td> </tr>');
	}

	for(var i = 0; i < 5; i++){
		addrow();
	}
});

