const { Cart, validate } = require('../models/cart');

const getCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const cart = await Cart.findOne({userId});
    if(!cart) res.send("cart is empty");
    return res.send(cart);
  } catch (err) {
    return res.status(404).json({message: err.message})
  }
}

const updateCart = async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const { userId, products } = req.body;

  try {
    let cart = await Cart.findOne({ userId })
    if(!cart) {
      cart = new Cart({
        userId, products
      })
      const data = await cart.save();
      return res.status(201).send(data);
    }
    const result = await Cart.findByIdAndUpdate(cart._id, {
      userId, products
    }, { new: true});
    return res.send(result);

  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
}


const clearCart = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const cart = await Cart.findOne({ userId });  
    if(!cart) return res.status(404).send('Cart is empty');
    const result = await Cart.findByIdAndUpdate(cart._id, {
      userId,
      products: []
    }, {new: true})
    return res.send(result);
  } catch (err) {
    return res.status(500).send('Something went wrong'); 
  }
}

module.exports = {
  getCart,
  updateCart,
  clearCart
}