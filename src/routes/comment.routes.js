const { Router } = require('express');
const router = Router();
const {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    getCommentById,
} = require('../controllers/comment.controller');

router.get('/', getComments);

router.get('/:id', getCommentById);

router.put('/:id', updateComment);

router.post('/', createComment);

router.delete('/:id', deleteComment);

module.exports = router;
