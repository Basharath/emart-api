const { Product, validate } = require('../models/products');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const products = Product.find();
  res.send(products)
})

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    images: req.body. images,
    price: req.body.price,
    stock: req.body.stock
  })
  product.save((err, data) => {
    if(err) console.log(err);
    return res.send(data);
  })

})



module.exports = router;