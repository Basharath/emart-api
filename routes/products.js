const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vendor = require('../middleware/vendor');
const upload = require('../utils/multer');

const {
  getProducts,
  postProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.post('/', [upload.array('product'), auth, vendor], postProduct);
router.put('/:id', [upload.array('product'), auth, vendor], updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', [auth, vendor], deleteProduct);

module.exports = router;
