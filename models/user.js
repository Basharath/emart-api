const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 255,
    required: true,
  },
  isVendor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, minlength: 8, maxlength: 1024, required: true },
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    email: Joi.string().email().min(4).max(255).required(),
    isVendor: Joi.boolean(),
    password: Joi.string().min(8).max(15).required(),
  });

  return schema.validate(user);
};

module.exports = {
  User,
  validate: validateUser,
};
