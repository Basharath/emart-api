const router = require('express').Router();
const { signIn, signUp, changePassword } = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/changepassword', auth, changePassword);

module.exports = router;
