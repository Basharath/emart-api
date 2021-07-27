const router = require('express').Router();
const auth = require('../middleware/auth');

const { getCart, updateCart, clearCart } = require('../controllers/cart');

router.get('/:id', auth, getCart);
router.post('/:id', auth, updateCart);
router.delete('/:id', auth, clearCart);

module.exports = router;
