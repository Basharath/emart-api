const router = require('express').Router();
const validateObjectId = require('../middleware/validateObjectId');
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

router.put('/:id', [validateObjectId, auth, admin], updateCategory);

router.delete('/:id', [validateObjectId, auth, admin], deleteCategory);

module.exports = router;
