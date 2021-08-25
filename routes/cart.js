const router = require('express').Router();
const auth = require('../middleware/auth');

const { getCart, updateCart, clearCart } = require('../controllers/cart');
const { checkoutCart } = require('../controllers/orders');

router.get('/', auth, getCart);
router.post('/', auth, updateCart);
router.post('/checkout', auth, checkoutCart);
router.delete('/', auth, clearCart);

module.exports = router;
