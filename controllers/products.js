const { Product, validate, validateRating } = require('../models/product');
const { Category } = require('../models/category');
const cloudinary = require('../utils/cloudinary');

exports.getProducts = async (req, res, next) => {
  const userId = req.query.user;

  try {
    const products = userId
      ? await Product.find({ userId })
      : await Product.find();

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

  const userId = req.user.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    const images = [];
    if (req.files && req.files.length > 0) {
      for (const image of req.files) {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'emart',
        });
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
      userId,
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

  const { id } = req.params;
  if (!id) return res.status(400).send('Product ID parameter missing');
  const { id: userId, isAdmin } = req.user;

  const { name, description, categoryId, price, offer, stock, seller } =
    req.body;

  let images = JSON.parse(req.body.images) || [];
  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send('Invalid category');

    let product = await Product.findById(id);
    if (!product) return res.status(404).send('Product is not found');
    if (userId !== product.userId && !isAdmin)
      return res.status(403).send('You can not update the product');

    if (req.files) {
      if (images.length !== product.images.length) {
        const deletedImages = product.images.filter((p) =>
          images.every((i) => i.cloudId !== p.cloudId)
        );
        deletedImages.forEach(
          async (i) => await cloudinary.uploader.destroy(i.cloudId)
        );
      }

      if (req.files.length > 0) {
        for (const image of req.files) {
          const result = await cloudinary.uploader.upload(image.path, {
            folder: 'emart',
          });
          const url = result.secure_url;
          const cloudId = result.public_id;
          images.push({ url, cloudId });
        }
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
        ...(images.length > 0 && { images }),
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

  if (!productId) return res.status(400).send('Product ID parameter missing');

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
  const { id, isAdmin } = req.user;

  if (!productId) return res.status(400).send('Product ID parameter missing');

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('No product with the given ID');
    if (id !== product.userId && !isAdmin)
      return res.status(403).send('You can not delete the product');

    for (const image of product.images) {
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
  if (!productId) return res.status(400).send('Product ID parameter missing');

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
