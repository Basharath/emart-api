const mongoose = require('mongoose');
// const Joi = require('joi');

const productSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [productSchema],
    delivered: { type: Boolean, default: false },
    date: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const Order = mongoose.model('Order', orderSchema);

// const validateOrder = (order) => {
//   const schema = Joi.array()
//     .items(
//       Joi.object({
//         product: Joi.objectId().required(),
//         quantity: Joi.number().required(),
//         price: Joi.number().min(1).required(),
//       })
//     )
//     .required();

//   return schema.validate(order);
// };

module.exports = {
  Order,
  // validate: validateOrder,
};
