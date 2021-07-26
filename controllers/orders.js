const { Order, validate } = require('../models/order');

const getOrders = async (req, res) => {
  const userId = req.params.id;
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
    return res.status(500).send(err.message);
  }
};

const postOrder = async (req, res) => {
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
    return res.status(500).send(err.message);
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) return res.status(404).send('Order does not exists');

    return res.send(order);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getOrders,
  postOrder,
  cancelOrder,
};
