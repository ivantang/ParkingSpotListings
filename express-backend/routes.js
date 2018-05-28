// router from http://www.iosinsight.com/backend-rest-api-nodejs/

var express = require('express');

var router = express.Router();
var Location = require('./location');

// middleware for all requests
// print timestamp in console for debugging
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dataDisplayed(Date.now()));
  next();
});

router.get('/', function(req, res){
  res.json({message: 'what you get from'});
});

//get all locations
router.route('/locations')
  .get(function(req, res) {
    Location.find(function(err,locations) {
      if (err)
        res.send(err);
      res.json(locations);
    });
  });

//save a locations
router.route('/locations')
  .post(function(req, res) {
    var location = new Location();
    location.lat = req.body.lat;
    location.lng = req.body.lng;
    location.email = req.body.email;
    location.rate = req.body.rate;
    location.isOccupied = req.body.isOccupied;

    console.log(req.data);
    console.log("\n\n");
    console.log(location);

    //save message to the db
    location.save(function(err) {
      if (err)
        res.send(err);
      res.json({ location: "Location saved!"});
    });
  });


module.exports = router;

function dataDisplayed(timestamp) {
  var date = new Date(timestamp);
  return (date.getMonth() + 1 + '/' +
          date.getDate() + '/' +
          date.getFullYear() + " " +
          date.getHours() + ":" +
          date.getMinutes() + ":" +
          date.getSeconds());
}
