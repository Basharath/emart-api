const mongoose = require('mongoose');
const Joi = require('joi');

const itemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
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
  { timestamps: true, _id: false }
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
    productId: Joi.objectId().required(),
    quantity: Joi.number().min(0).required(),
  });

  return schema.validate(cart);
};

module.exports = {
  Cart,
  validate: validateCart,
};
