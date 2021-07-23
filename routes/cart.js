const router = require('express').Router();

const { getCart, updateCart, clearCart } = require('../controllers/cart');

router.get('/', getCart);
router.post('/:id', updateCart);
router.delete('/:id', clearCart);

module.exports = router;