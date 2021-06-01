/* eslint-disable no-underscore-dangle */
const debug = require('debug')('server:userController');
const Order = require('../models/order.model');

function orderController() {
  debug('Entered to orderController');
  async function getById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      return res.json(order);
    } catch (error) {
      return res.status(404);
    }
  }

  async function update(req, res) {
    try {
      const { orderId } = req.params;
      const updatedOrder = await Order.findOneAndUpdate(orderId,
        { ...req.body },
        { new: true });
      return res.json({
        updatedOrder,
      });
    } catch (error) {
      return res.status(404);
    }
  }

  async function getAll(req, res) {
    try {
      const orders = await Order.find({ userId: req.userId });
      return res.json(orders);
    } catch (error) {
      return res.status(404);
    }
  }

  return {
    getById,
    update,
    getAll,
  };
}

module.exports = orderController;
