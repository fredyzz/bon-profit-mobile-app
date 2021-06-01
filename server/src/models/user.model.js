const { model, Schema } = require('mongoose');
const md5 = require('md5');

const userSchema = Schema({
  name: String,
  lastname: String,
  email: String,
  phone: String,
  password: String,
  avatarUrl: String,
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return md5(password) === this.password;
};

module.exports = model('User', userSchema);
