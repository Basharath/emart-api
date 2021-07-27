const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

router.get('/', getCategories);

router.post('/', [auth, admin], addCategory);

router.put('/:id', [auth, admin], updateCategory);

router.delete('/:id', [auth, admin], deleteCategory);

module.exports = router;
