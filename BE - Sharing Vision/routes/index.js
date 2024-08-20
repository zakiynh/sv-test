const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/article', postController.createPost);
router.get('/article', postController.getPost);
router.get('/article/:id', postController.getPostById);
router.put('/article/:id', postController.updatePost);
router.delete('/article/:id', postController.deletePost);

module.exports = router;