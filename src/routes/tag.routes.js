const { Router } = require('express');
const router = Router();
const {
    createTag,
    getTags,
    deleteTag,
} = require('../controllers/tag.controller');

router.post('/', createTag);

router.get('/', getTags);

router.delete('/:id', deleteTag);

module.exports = router;
