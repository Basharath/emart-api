const stripe = require('stripe')(process.env.stripePrivateKey);
const { Order } = require('../models/order');
const { Cart } = require('../models/cart');

const checkoutURL = process.env.checkoutURL;

const getOrders = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate(
      'products.product',
      'name images'
    );
    if (!orders) return res.status(404).send('No orders found');

    return res.send(orders);
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate(
      'products.product',
      'name images'
    );
    if (!order) return res.status(404).send('No order found');

    return res.send(order);
  } catch (err) {
    next(err);
  }
};

const checkoutCart = async (req, res) => {
  const products = req.body;

  const line_items = products.map((p) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.name,
        },
        unit_amount: p.price * 100,
      },
      quantity: p.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${checkoutURL}?status=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${checkoutURL}?status=false`,
  });

  return res.send(session.url);
};

const postOrder = async (req, res, next) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const userId = req.user.id;
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // const customer = await stripe.customers.retrieve(session.customer);
    if (!session) return res.status(400).send('Invalid payment session');

    const cartData = await Cart.findOne({ userId });
    const products = cartData && cartData.items;

    if (!products.length > 0) return res.status(400).send('Bad request');
    let order = new Order({
      userId,
      products,
    });

    order = await order.save();

    const orderData = await order
      .populate({
        path: 'products.product',
        select: 'name images price',
      })
      .execPopulate();

    return res.send(orderData);
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  const orderId = req.params.id;

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
  getOrder,
  checkoutCart,
  postOrder,
  cancelOrder,
};
