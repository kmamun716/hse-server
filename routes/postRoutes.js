const router = require('express').Router();
const verifyToken = require('../lib/verifyToken');
const postController = require('../controllers/postController');


router.post('/create', verifyToken, postController.createPost);
router.get('/all', postController.allPost);
router.get('/allPostOfUser', verifyToken, postController.getAllPostByUser);
router.get('/:slug', postController.getPostBySlug);
router.route('/:id')
.get(postController.getPostById)
.put(verifyToken, postController.updatePost)
.delete(verifyToken, postController.deletePost)

module.exports = router;