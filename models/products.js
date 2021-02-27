const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true},
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
})

const Product = mongoose.model('Product', productSchema);


const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(20).required(),
    images: Joi.required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(0).required()
  })
  return schema.validate(product);
}

module.exports = {
  Product,
  validate: validateProduct
}