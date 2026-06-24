const { Router } = require('express');
const router = Router();
const {
    createComment,
    updateComment,
    deleteComment,
    getComments,
} = require('../controllers/comment.controller');

router.get('/', getComments);

router.put('/:id', updateComment);

router.post('/', createComment);

router.delete('/:id', deleteComment);

module.exports = router;
