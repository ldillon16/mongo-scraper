





$("scrape").on("click", function(x) {
	$.ajax({
		method: "GET",
		url: "/scrape"
	}).
})


// save article button
$("document").on("click", ".save", function() {
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "articles/save/" + thisId
	})
	.then(function(data) {
		console.log("article saved")
		window.location = "/"
	})
})




// save note button
$("document").on("click", "#savenote", function() {

	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "/articles/note/" + thisId,
		data: {
			body: $("#bodyinput").val()
		}
	})

	.then(function(data) {
		console.log(data);

		//empty notes section
		$("#notes").empty();
	});

	$("bodyinput").val("");
})