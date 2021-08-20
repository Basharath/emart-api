const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vendor = require('../middleware/vendor');
const upload = require('../utils/multer');

const {
  getProducts,
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  rateProduct,
} = require('../controllers/products');

const LIMIT = process.env.productLimit || 4;

router.get('/', getProducts);
router.post('/', [upload.array('product', LIMIT), auth, vendor], addProduct);
router.put('/:id', [upload.array('product'), auth, vendor], updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', [auth, vendor], deleteProduct);
router.patch('/:id', auth, rateProduct);

module.exports = router;
