const { Order, validate } = require('../models/order');

const getOrders = async (req, res, next) => {
  const userId = req.user.id;
  const orderId = req.query.id;

  try {
    let orders;
    if (orderId)
      orders = await Order.findById(orderId).populate(
        'products.product',
        'title category'
      );
    else orders = await Order.find({ userId });
    if (!orders) return res.status(404).send('No orders found');

    return res.send(orders);
  } catch (err) {
    next(err);
  }
};

const postOrder = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId, products } = req.body;
  try {
    const order = new Order({
      userId,
      products,
    });

    const orderData = await order.save();

    return res.send(orderData);
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  const orderId = req.query.id;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) return res.status(404).send('Order does not exists');

    return res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
  postOrder,
  cancelOrder,
};
