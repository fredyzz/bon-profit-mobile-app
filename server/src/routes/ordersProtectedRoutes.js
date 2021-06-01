/* eslint-disable no-underscore-dangle */
const express = require('express');
const orderController = require('../controllers/order.controller')();

const router = express.Router();

router
  .route('/')
  .get(orderController.getAll);

router
  .route('/:orderId')
  .get(orderController.getById)
  .put(orderController.update);

module.exports = router;
