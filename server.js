// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var request = require("request");
var cheerio = require("cheerio");

// requiring all models
var db = require("./models");

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

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

// homepage route
app.get("/", function(req, res) {
	res.send("wazzup");
})








// start server
app.listen(PORT, function() {
	console.log("app running on port " + PORT + "!")
})

