/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var scarf = require('./models/scarf');
var weather = require('./models/weather');

var app = module.exports = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/scarf', function(req, res) {
	var zip = '80303';
	if (req.query.zip) {
		zip = req.query.zip;
	}
	var year = req.query.year || '2014';
	var weather = new WeatherService(zip, year);
	weather.getWeather(function(data) {
		var scarf = new Scarf(data, 10, 70, 160);
		scarf.createScarf();
 		res.json(scarf);
	})
	
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
