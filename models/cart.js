const mongoose = require('mongoose');
const Joi = require('joi');

const cartSchema = new mongoose.Schema({

})

const Cart = mongoose.model('Cart', cartSchema);


const validateCart = (cart) => {
  const schema = Joi.object({

  })
  
  return schema.validate(cart);
}

module.exports = {
  Cart,
  validate: validateCart
}