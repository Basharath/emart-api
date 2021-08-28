const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 255,
    trim: true,
    lowercase: true,
    required: true,
  },
  isVendor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, minlength: 8, maxlength: 1024 },
});

userSchema.methods.generateToken = function genToken() {
  const token = jwt.sign(
    {
      id: this._id,
      isVendor: this.isVendor,
      isAdmin: this.isAdmin,
      name: this.name,
    },
    process.env.jwtPrivateKey,
    {
      expiresIn: '1hr',
    }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).label('Name'),
    email: Joi.string().email().min(4).max(255).required().label('Email'),
    isVendor: Joi.boolean(),
    password: Joi.string().min(8).max(15).required().label('Password'),
  });

  return schema.validate(user);
};

module.exports = {
  User,
  validate: validateUser,
};
