const { Router } = require('express');
const authController = require('../controllers/authControllers');
const requireAuth = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/signin', authController.signin_post);
router.route('/profile').get(requireAuth, authController.getUser);

module.exports = router;
