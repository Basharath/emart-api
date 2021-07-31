const express = require('express');
const products = require('../routes/products');
const cart = require('../routes/cart');
const categories = require('../routes/categories');
const users = require('../routes/users');
const orders = require('../routes/orders');
const home = require('../controllers/home');
const error = require('../middleware/error');
const notFound = require('../middleware/404');

module.exports = (app) => {
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: false, limit: '30mb' }));
  app.use('/api/products', products);
  app.use('/api/cart', cart);
  app.use('/api/categories', categories);
  app.use('/api/users', users);
  app.use('/api/orders', orders);
  app.get('/', home);
  app.use(notFound);
  app.use(error);
};
