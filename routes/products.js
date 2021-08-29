const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vendor = require('../middleware/vendor');
const validateObjectId = require('../middleware/validateObjectId');
const upload = require('../utils/multer');

const {
  getProducts,
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  rateProduct,
  searchProducts,
} = require('../controllers/products');

const LIMIT = process.env.productLimit || 4;

router.get('/search', searchProducts);
router.get('/:id', validateObjectId, getProduct);
router.get('/', getProducts);

router.post('/', [upload.array('product', LIMIT), auth, vendor], addProduct);
router.put(
  '/:id',
  [validateObjectId, upload.array('product'), auth, vendor],
  updateProduct
);
router.delete('/:id', [validateObjectId, auth, vendor], deleteProduct);
router.patch('/:id', validateObjectId, auth, rateProduct);

module.exports = router;
