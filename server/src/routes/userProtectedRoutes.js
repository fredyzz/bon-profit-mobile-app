/* eslint-disable no-underscore-dangle */
const express = require('express');
const { uploadAvatar } = require('../helpers/images.helper');
const userController = require('../controllers/user.controller')();

const router = express.Router();

router
  .route('/')
  .get(userController.getData)
  .post(userController.updateUser);

router
  .route('/avatar')
  .post(uploadAvatar.single('upload'), userController.saveAvatar);

module.exports = router;
