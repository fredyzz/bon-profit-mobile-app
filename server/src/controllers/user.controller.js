/* eslint-disable no-underscore-dangle */
const debug = require('debug')('server:userController');
const User = require('../models/user.model');
const Order = require('../models/order.model');

function userController() {
  debug('Entered to ');
  async function getData(req, res) {
    try {
      const user = await User.findById(req.user._id).populate({ path: 'orders', model: Order });
      return res.json({
        user,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  async function updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(req.user._id,
        { ...req.body },
        { new: true });
      return res.json({
        updatedUser,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  async function saveAvatar(req, res) {
    const host = req.get('host');
    const userId = req.user._id;
    const avatarUrl = `${host}/public/avatars/${userId}-avatar.jpg`;
    try {
      if (!req.file) return res.status(400).send({ error: 'No attached file' });
      if (req.file && !req.file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return res.status(400).send({ error: 'Upload an image file' });
      }
      const user = await User.findByIdAndUpdate(userId, { avatarUrl });
      return res.json({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  return {
    getData,
    saveAvatar,
    updateUser,
  };
}

module.exports = userController;
