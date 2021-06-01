const { model, Schema } = require('mongoose');

const dishSchema = Schema({
  title: String,
  category: String,
  price: Number,
  cookTime: Number,
  imagesHref: [String],
  isAvailable: Boolean,
  isActive: Boolean,
});

module.exports = model('Dishes', dishSchema);
