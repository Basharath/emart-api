const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('./category');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      minlength: 20,
      required: true,
    },
    category: { type: categorySchema, require: true },
    images: { type: [Object], default: [] },
    price: { type: Number, min: 1, required: true },
    offer: { type: Number, min: 1, required: true },
    stock: { type: Number, min: 0, required: true },
    seller: { type: String, required: true },
    rating: { type: [Object], default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required().label('Product name'),
    description: Joi.string().min(20).required().label('Description'),
    categoryId: Joi.objectId().required().label('Category'),
    price: Joi.number().min(1).required().label('Original price'),
    offer: Joi.number().min(1).required().label('Discounted price'),
    seller: Joi.string().required().label('Seller name'),
    stock: Joi.number().min(0).required().label('Stock'),
    images: Joi.array(),
    // rating: Joi.array().items(
    //   Joi.object({ id: Joi.string(), rate: Joi.number() })
    // ),
    rating: Joi.array().label('Rating'),
  });

  return schema.validate(product);
};

const validateRating = (obj) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    rate: Joi.number().min(1).max(5),
  });

  return schema.validate(obj);
};

module.exports = {
  Product,
  validate: validateProduct,
  validateRating,
};
