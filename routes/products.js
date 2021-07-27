const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vendor = require('../middleware/vendor');

const {
  getProducts,
  postProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.post('/', [auth, vendor], postProduct);
router.put('/:id', [auth, vendor], updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', [auth, vendor], deleteProduct);

module.exports = router;
