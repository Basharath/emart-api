const express = require('express');
const router = express.Router();

const { getProducts, postProducts, updateProduct, getProduct, deleteProduct } = require('../controllers/products');


router.get('/', getProducts);
router.post('/', postProducts);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);

module.exports = router;