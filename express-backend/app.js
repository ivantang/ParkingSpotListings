var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');

//CORS
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

//body parser to get data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// define default for routes
app.use('/', routes);


var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/googlemapdb')

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
console.log("Listening on port: " + app.get('port'));

// start server lsitening on port 3000
/*app.listen(3000, function () {
  console.log('Listening on port 3000')
});
*/
