const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, maxlength: 255, required: true },
  },
  { versionKey: false }
);

const Category = mongoose.model('Category', categorySchema);

const validateProduct = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(category);
};

module.exports = {
  Category,
  validate: validateProduct,
  categorySchema,
};
