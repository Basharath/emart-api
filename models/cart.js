const mongoose = require('mongoose');
const Joi = require('joi');

const itemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [itemSchema],
  },
  { versionKey: false, timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    product: Joi.objectId().required(),
    quantity: Joi.number().min(0).required(),
  });

  return schema.validate(cart);
};

module.exports = {
  Cart,
  validate: validateCart,
};
