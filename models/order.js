const mongoose = require('mongoose');
const dayjs = require('dayjs');

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
    deliveryDate: {
      type: Date,
      default: () => dayjs().add(Math.floor(Math.random() * 3 + 1), 'day'),
    },
    date: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};
