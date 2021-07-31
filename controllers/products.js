const { Product, validate, validateRating } = require('../models/product');
const { Category } = require('../models/category');
const cloudinary = require('../utils/cloudinary');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, description, categoryId, price, offer, stock, seller } =
    req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const images = [];
    if (req.files && req.files.length > 0) {
      for (let image of req.files) {
        const result = await cloudinary.uploader.upload(image.path);
        const url = result.secure_url;
        const cloudId = result.public_id;
        images.push({ url, cloudId });
      }
    }

    const product = new Product({
      name,
      description,
      category: {
        _id: category._id,
        name: category.name,
      },
      images,
      price: +price,
      offer: +offer,
      stock: +stock,
      seller,
    });

    const data = await product.save();
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const { name, description, categoryId, price, offer, images, stock, seller } =
    req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    let product = await Product.findById(id);
    if (!product) return res.status(404).send('Product is not found');

    if (req.files && req.files.length > 0) {
      for (let image of product.images) {
        await cloudinary.uploader.destroy(image.cloudId);
      }

      images = [];
      for (let image of req.files) {
        const result = await cloudinary.uploader.upload(image.path);
        const url = result.secure_url;
        const cloudId = result.public_id;
        images.push({ url, cloudId });
      }
    }

    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category: {
          _id: category._id,
          name: category.name,
        },
        images,
        price: +price,
        offer: +offer,
        stock: +stock,
        seller,
      },
      { new: true }
    );
    return res.send(product);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('No product found');
    return res.send(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
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
    next(err);
  }
};

exports.rateProduct = async (req, res, next) => {
  const { error } = validateRating(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const productId = req.params.id;

  const { id, rate } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          rating: { id, rate },
        },
      },
      { new: true }
    );

    if (!product) return res.status(400).send('Product is not found');

    return res.send(product);
  } catch (err) {
    next(err);
  }
};
