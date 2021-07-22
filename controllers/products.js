const { Product, validate } = require('../models/products');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    return res.status(404).json({message: err.message})
  }
}

exports.postProducts = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const { title, description, images, price, offer, stock, rating, seller } = req.body;

  const product = new Product({
    title, description, images, price, offer, stock, rating, seller
  })

  product.save((err, data) => {
    if(err) console.log(err);
    return res.send(data);
  })
}

exports.updateProduct = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const { title, description, images, price, offer, stock, rating, seller } = req.body;
  
  const product = await Product.findByIdAndUpdate(id, { 
    title, description, images, price, offer, stock, rating, seller 
  }, { new: true});
  
  if(!product) return res.status(400).send('Product is not found');
  
  return res.send(product);
}

exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if(!product) return res.status(404).send('No product found');
  
  return res.send(product);
} 

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findByIdAndDelete(productId);
  if(!product) return res.status(404).send('No product with the given ID');
  
  return res.send(product);
}