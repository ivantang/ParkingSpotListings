var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  x: Number,
  y: Number,
  email: String,
  rate: Number,
  isOccupied: Boolean,
});

module.exports = mongoose.model('Location', locationSchema);
