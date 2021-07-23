const express = require('express');
const router = express.Router();

const { getProducts, postProduct, updateProduct, getProduct, deleteProduct } = require('../controllers/products');


router.get('/', getProducts);
router.post('/', postProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);

module.exports = router;