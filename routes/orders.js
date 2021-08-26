const router = require('express').Router();
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const {
  getOrders,
  getOrder,
  postOrder,
  cancelOrder,
} = require('../controllers/orders');

router.get('/', auth, getOrders);
router.get('/:id', validateObjectId, auth, getOrder);
router.post('/', auth, postOrder);
router.delete('/:id', validateObjectId, auth, cancelOrder);

module.exports = router;
