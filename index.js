const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const products = require('./routes/products');
const cart = require('./routes/cart');
const categories = require('./routes/categories');
const users = require('./routes/users');
const orders = require('./routes/orders');

const app = express();
const db = process.env.db;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log(err));

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: false, limit: '30mb' }));

app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/orders', orders);

app.get('/', (req, res) => {
  return res.send('Welcome to the eMart API.');
});

app.use((req, res) => {
  console.log('path', req.path);
  return res.status(404).send('Resource not found!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Started listening at ${PORT}`));
