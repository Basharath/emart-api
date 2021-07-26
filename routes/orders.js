const router = require('express').Router();
const { getOrders, postOrder, cancelOrder } = require('../controllers/orders');

router.get('/:id', getOrders);
router.post('/', postOrder);
router.delete('/:id', cancelOrder);

module.exports = router;
