const router = require('express').Router();

const { getCart, updateCart, clearCart } = require('../controllers/cart');

router.get('/:id', getCart);
router.post('/', updateCart);

module.exports = router;