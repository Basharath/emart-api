const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true},
  price: { type: Number, required: true },
  offer: { type: Number, required: true},
  stock: { type: Number, required: true },
  seller: { type: String, required: true },
  rating: { type: [Number] },
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(20).required(),
    images: Joi.required(),
    price: Joi.number().min(1).required(),
    offer: Joi.number().min(1).required(),
    seller: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    rating: Joi.array()
  })

  return schema.validate(product);
}

module.exports = {
  Product,
  validate: validateProduct
}