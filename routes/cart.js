const router = require('express').Router();
const auth = require('../middleware/auth');

const { getCart, updateCart, clearCart } = require('../controllers/cart');

router.get('/', auth, getCart);
router.post('/', auth, updateCart);
router.delete('/', auth, clearCart);

module.exports = router;
