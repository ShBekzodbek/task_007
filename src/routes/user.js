const User = require('../controllers/user');
const authenticateToken = require('../middlewares/auth/authenticateToken');

const router = require('express').Router()

router.post('/signup', User.signup);

router.post('/signin', User.signin);


module.exports = router