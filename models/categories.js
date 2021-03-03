const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
})

const Category = mongoose.model('Category', categorySchema);


const validateProduct = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  })
  return schema.validate(categorySchema);
}

module.exports = {
  Category,
  validate: validateProduct
}