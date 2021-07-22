const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isVendor: { type: Boolean, default: false },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema);


const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required()
  })
  return schema.validate(schema);
}

module.exports = {
  User,
  validate: validateUser
}