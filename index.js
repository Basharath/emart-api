const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const products = require('./routes/products');
const cart = require('./routes/cart');
const users = require('./routes/users');

const app = express();
const db = config.get('db');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to MongoDb'))
  .catch(err => console.log(err));

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: false, limit: '30mb'}));

app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/users', users);

app.get('/', (req, res) => {
  return res.send('Welcome to the eMart API.')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Started listening at ${PORT}`))