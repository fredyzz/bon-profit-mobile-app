const express = require('express');
const debug = require('debug')('server');
const morgan = require('morgan');
const passport = require('passport');

const PORT = process.env.PORT || 4000;

require('dotenv').config();
require('./src/ddbb/mongoose.config');
require('./src/auth/auth');

const server = express();
const authRoutes = require('./src/routes/authRoutes');
const userProtectedRoutes = require('./src/routes/userProtectedRoutes');
const restaurantProtectedRoutes = require('./src/routes/restaurantProtectedRoutes');
const ordersProtectedRoutes = require('./src/routes/ordersProtectedRoutes');

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/public/avatars', express.static('./public/avatars'));

server.use('/api/auth/', authRoutes);
server.use('/api/user', passport.authenticate('jwt', { session: false }), userProtectedRoutes);
server.use('/api/restaurants', passport.authenticate('jwt', { session: false }), restaurantProtectedRoutes);
server.use('/api/orders', passport.authenticate('jwt', { session: false }), ordersProtectedRoutes);

server.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

server.listen(PORT, debug(`server is running on port ${PORT}`));
