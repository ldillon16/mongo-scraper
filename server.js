// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// requiring all models
var db = require("./models");

// port
var PORT = process.env.PORT || 8080;

// initialize express
var app = express();

// config middleware

// use morgan logger for loggin results
app.use(logger("dev"));
// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// connect to the MongoDB

mongoose.connect("mongodb")
