const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../lib/verifyToken');

router.get('/all', userController.getAllUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.route('/:id')
.get(userController.getUserById)
.put(verifyToken, userController.updateUser)
.delete(verifyToken, userController.deleteUser)

module.exports = router;