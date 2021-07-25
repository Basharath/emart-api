const { Product, validate } = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

exports.postProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, description, images, price, offer, stock, rating, seller } =
    req.body;
  const product = new Product({
    title,
    description,
    images,
    price,
    offer,
    stock,
    rating,
    seller,
  });

  try {
    const data = await product.save();
    return res.status(201).send(data);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const { title, description, images, price, offer, stock, rating, seller } =
    req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        images,
        price,
        offer,
        stock,
        rating,
        seller,
      },
      { new: true }
    );
    if (!product) return res.status(400).send('Product is not found');
    return res.send(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('No product found');
    return res.send(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).send('No product with the given ID');
    return res.send(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
