const router = require('express').Router();
const auth = require('../middleware/auth');

const { getOrders, postOrder, cancelOrder } = require('../controllers/orders');

router.get('/', auth, getOrders);
router.post('/', auth, postOrder);
router.delete('/', auth, cancelOrder);

module.exports = router;
