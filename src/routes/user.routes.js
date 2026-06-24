const { Router } = require('express');
const {
    createUser,
    getUsers,
    getUserByNickName,
    updateUser,
    deleteUser,
    getUserPosts,
    getUserComments,
} = require('../controllers/user.controller');
const router = Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:nickName', getUserByNickName);

router.put('/:nickName', updateUser);

router.delete('/:nickName', deleteUser);

router.get('/:nickName/posts', getUserPosts);

router.get('/:nickName/comments', getUserComments);
module.exports = router;
