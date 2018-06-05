// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var request = require("request");
var cheerio = require("cheerio");

// requiring all models
var Note = require("./models/note.js");
var Article = require("./models/article.js")

// port
var PORT = process.env.PORT || 8080;

// initialize express
var app = express();

// database config
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// config middleware

// use morgan logger for loggin results
app.use(logger("dev"));
// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// connect to the MongoDB

// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

// homepage route
app.get("/", function(req, res) {
	res.send("wazzup");
});

// GET route for scraping echoJS website
app.get("/scrape", function(req, res) {
	// use request to grab body of html
	request("https://www.nytimes.com/", function(error, response, html) {
		// load html into cheerio with $ as a shorthand selector
		var $ = cheerio.load(response.data);

		// grab every h2 within an article tag
		$("article h2").each(function(i, element) {
			// save an empty result object
			var result = {};

			// add the text, summary, and href of every link & save them as properties of result object
			result.title = $(this)
				.children("a")
				.text();
			result.summary = $(this)
				.children(".summary")
				.text();
			result.link = $(this)
				.children("a")
				.attr("href");

			// create new article using "result" object built from scraping 
			Article.create(result)
				.then(function(dbArticle) {
					// display added result in console
					console.log(dbArticle);
				})
				.catch(function(err) {
					// if an error occurs, send it to the client
					return res.json(err);
				});
		});

		// if we are able to successfully scrape & save an Article, send a msg to the client
		res.send("Scrape Complete!")
	});
});

// GET route for getting saved articles
app.get("/articles/saved", function(req, res) {
	// grab every article in the Articles collection
	Article.find({})
		.then(function(dbArticle) {
			// if we're able to successfully update article, send back to client
			res.json(dbArticle);
		})

		.catch(function(err) {
			// if an error occurred, send to client
			res.json(err);
		});
});

// PUT route for saving article
app.put("/articles/save/:id", function(req, res) {
	// use article id to find & update its boolean
	Article.findOneAndUpdate({ _id: req.params.id }, { saved: true });
		.then(function(dbArticle) {
			// if we're able to successfully update article, send back to client
			res.json(dbArticle);
		})

		.catch(function(err) {
			// if an error occurred, send to client
			res.json(err);
		})
});


// DELETE route for deleting article

app.post("/articles/delete/:id", function() {
	// use article _id to find & update saved boolean
	Article.findOneAndUpdate({ _id: req.params.id}, { saved: false }, { notes: [] });
		.then(function(dbArticle) {
			// if we're able to successfully update article, send back to client
			res.json(dbArticle);
		})

		.catch(function(err) {
			// if an error occurred, send to client
			res.json(err);
		})
});

// POST route for creating new note
app.post("/articles/:id", function(req, res) {
	// create a new note and pass the req.body to the entry
	Note.create(req.body)
		.then(function(dbNote) {
			// if a note was created successfully, find one Article with an "_id" and equal to "req.params.id"
			// update the article to be associated with the new Note
			return Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
		})
		.then(function(dbArticle) {
			// if we were able to successfully add a note to an article, send it back to the client
			res.json(dbArticle);
		})
		.catch(function(err) {
			// if an error occurred, send it to the client
			res.json(err);
		})
});

// DELETE route for deleting note
app.post("/notes/delete/:note_id/:article_id", function(req, res) {

})








// start server
app.listen(PORT, function() {
	console.log("app running on port " + PORT + "!")
})

