const { model, Schema } = require('mongoose');
const md5 = require('md5');

const restaurantSchema = Schema({
  name: String,
  password: String,
  avatarUrl: String,
  Address: {
    Street: String,
    Number: String,
    aditionalData: String,
    City: String,
    Country: String,
  },
  Contact: {
    Phone: String,
    Email: String,
    Website: String,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dishes',
  }],
});

restaurantSchema.methods.isValidPassword = function isValidPassword(password) {
  return md5(password) === this.password;
};

module.exports = model('Restaurant', restaurantSchema);
