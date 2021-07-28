const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('./category');

const productSchema = new mongoose.Schema(
  {
    title: {
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
    images: { type: [Object] },
    price: { type: Number, min: 1, required: true },
    offer: { type: Number, min: 1, required: true },
    stock: { type: Number, min: 0, required: true },
    seller: { type: String, required: true },
    rating: { type: [Object], default: [] },
  },
  { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(20).required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().min(1).required(),
    offer: Joi.number().min(1).required(),
    seller: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    rating: Joi.array().items(
      Joi.object({ id: Joi.string(), rate: Joi.number() })
    ),
  });

  return schema.validate(product);
};

module.exports = {
  Product,
  validate: validateProduct,
};
