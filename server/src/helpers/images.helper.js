/* eslint-disable no-underscore-dangle */
const multer = require('multer');

const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/avatars');
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}-avatar.jpg`);
  },
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file) {
      cb(new Error('Please upload a file.'));
    }
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image.'));
    }
    cb(undefined, true);
  },
});

const uploadAvatar = multer({ storage: avatarStorage });

module.exports = { uploadAvatar };
