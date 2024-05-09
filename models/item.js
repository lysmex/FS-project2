// scheman määrittely

// tuodaan mongoose
const mongoose = require('mongoose');

// uusi schema, jolla vaaditut tiedot nimi, ingredients ja instructions
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true, minlength: 1 },
  instructions: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;