const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');
const cloudinary = require('../utils/cloudinary');
const product = require('../models/product');

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

  const {
    title,
    description,
    categoryId,
    price,
    offer,
    stock,
    rating,
    seller,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const images = [];
    for (let image of req.files) {
      const result = await cloudinary.uploader.upload(image.path);
      const url = result.secure_url;
      const cloudId = result.public_id;
      images.push({ url, cloudId });
    }

    const product = new Product({
      title,
      description,
      category: {
        _id: category._id,
        name: category.name,
      },
      images,
      price: +price,
      offer: +offer,
      stock: +stock,
      rating,
      seller,
    });

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
  const {
    title,
    description,
    categoryId,
    price,
    offer,
    stock,
    rating,
    seller,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const product = await Product.findById(id);
    if (!product) return res.status(404).send('Product is not found');

    for (let image of product.images) {
      await cloudinary.uploader.destroy(image.cloudId);
    }

    const images = [];
    for (let image of req.files) {
      const result = await cloudinary.uploader.upload(image.path);
      const url = result.secure_url;
      const cloudId = result.public_id;
      images.push({ url, cloudId });
    }

    product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category: {
          _id: category._id,
          name: category.name,
        },
        images,
        price: +price,
        offer: +offer,
        stock: +stock,
        rating,
        seller,
      },
      { new: true }
    );
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
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('No product with the given ID');

    for (let image of product.images) {
      image.cloudId && (await cloudinary.uploader.destroy(image.cloudId));
    }
    product.deleteOne();
    return res.send(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
