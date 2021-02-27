const products = require('./routes/products');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/emart', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDb'))
  .catch(err => console.log(err));


app.use(express.json());

app.use('/api/products', products);

app.get('/', (req, res) => {
  res.send('Welcome to the eMart API.')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Started listening at ${PORT}`))