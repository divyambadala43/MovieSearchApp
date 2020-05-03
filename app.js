var express = require("express");
var request = require("request");
var app = express();

app.set("view engine", "ejs")
app.use(express.static("public"));

app.get("/", function(req, res){
	res.render("movieSearch");
});

app.get("/results", function(req, res){
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var movieData = JSON.parse(body);
			res.render("results", {movieData: movieData});
		}
	});
});

app.listen(3000, function(){
	console.log("Movie App Has Started!!!");
});