const { Cart, validate } = require('../models/cart');
const { Product } = require('../models/product');

const getCart = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    // const cart = await Cart.findOne({ userId }).populate({
    //   path: 'items.productId',
    //   select: 'title images',
    // });
    if (!cart) return res.status(404).send('cart is empty');
    return res.send(cart);
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const { error } = validate({ productId, quantity, userId });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(500).send('Product not found');

    if (!cart) {
      const cartData = {
        userId,
        items: [
          {
            productId,
            quantity,
            price: product.price,
          },
        ],
      };
      cart = new Cart(cartData);

      const data = await cart.save();
      return res.status(201).send(data);
    }

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId.toString()
    );

    if (index !== -1 && quantity > 0) {
      cart.items[index].quantity = quantity;
      cart.items[index].price = product.price;
    } else if (index === -1 && quantity > 0) {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
      });
    } else if (quantity === 0) {
      cart.items.splice(index, 1);
    } else return res.status(400).send('Invalid request');

    const cartData = await cart.save();
    return res.send(cartData);
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send('Cart is empty');
    cart.items = [];
    const cartData = await cart.save();
    return res.send(cartData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  updateCart,
  clearCart,
};
