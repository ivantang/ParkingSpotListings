var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  lat: Number,
  lng: Number,
  email: String,
  rate: Number,
  isOccupied: Boolean,
});

module.exports = mongoose.model('Location', locationSchema);
