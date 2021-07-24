const mongoose = require('mongoose');
const Joi = require('joi');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: { type: [Object], required: true }
}, { versionKey: false })

const Cart = mongoose.model('Cart', cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(Joi.object({ id: Joi.string().required(), quantity: Joi.number().min(0).required()})).required()
  })
  
  return schema.validate(cart);
}

module.exports = {
  Cart,
  validate: validateCart
}