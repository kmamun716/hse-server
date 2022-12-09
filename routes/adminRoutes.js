const router = require('express').Router();
const verifyAdmin = require('../lib/verifyAdmin');
const verifyToken = require('../lib/verifyToken');
const adminController = require('../controllers/adminController');

router.put('/updateUser/:userId', verifyToken, verifyAdmin, adminController.updateUser); //update user
router.delete('/deleteUser/:userId', verifyToken, verifyAdmin, adminController.deleteUser); //delete user
router.put('/updatePost/:postId', verifyToken, verifyAdmin, adminController.updatePost); //update post
router.delete('/deletePost/:postId', verifyToken, verifyAdmin, adminController.deletePost); //delete post

module.exports = router;