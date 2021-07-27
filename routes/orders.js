const router = require('express').Router();
const auth = require('../middleware/auth');

const { getOrders, postOrder, cancelOrder } = require('../controllers/orders');

router.get('/:id', auth, getOrders);
router.post('/', auth, postOrder);
router.delete('/:id', auth, cancelOrder);

module.exports = router;
