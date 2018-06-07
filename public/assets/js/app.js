
// scrape button
$("document").on("click", "#scrape", function() {
	$.ajax({

		method: "GET",
		url: "/scrape"
	}).then(function(data) {
		console.log(data)
		window.location = "/"
	})
})


// save article button
$(".save").on("click", function() {
	console.log("save button clicked")
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "/articles/save/" + thisId
	})
	.then(function(data) {
		console.log("article saved")
		// window.location = "/"
	})
})

/// single article view
$("document").on("click", "h2", function() {
	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	.then(function(data) {
		console.log("article")

	})
})


// make a note
$("document").on("click", ".add-note", function() {

})



// save note button
$("document").on("click", ".savenote", function() {

	var thisId = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "/articles/note/" + thisId,
		data: {
			body: $("#bodyinput" + thisId).val()
		}
	})

	.then(function(data) {
		console.log(data);

		//empty notes section
		$("#bodyinput" + thisId).val("");
		window.location = "/articles/note/" + thisId;
	});


})


// delete note button
$("document").on("click", ".deleteNote", function() {
	// var noteId = $(this).attr()
	console.log("deleted!")

})







