const { Router } = require('express');
const router = Router();
const {
    updatePost,
    getAllPosts,
    getPostById,
    deletePost,
    createPost,
    addPostImage,
    removePostImage,
    addPostTag,
    removePostTag,
    getPostComments,
    getPostTags,
    getPostImages,
} = require('../controllers/post.controller');

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.get('/:id/comments', getPostComments);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.post('/:id/images', addPostImage);

router.delete('/:id/images/:imageId', removePostImage);

router.get('/:id/tags', getPostTags);

router.get('/:id/images', getPostImages);

router.post('/:id/tags', addPostTag);

router.delete('/:id/tags/:tagId', removePostTag);

module.exports = router;
