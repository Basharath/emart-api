const { Product, validate } = require('../models/products');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  return res.send(products);
}

exports.postProducts = async (req, res) => {
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
}