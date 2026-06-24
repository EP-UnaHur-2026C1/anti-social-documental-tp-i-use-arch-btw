const { Router } = require('express');
const router = Router();
const { follow, unfollow, getFollowers, getFollowing } = require('../controllers/follow.controller');

router.get('/:nick/followers', getFollowers);

router.get('/:nick/following', getFollowing);

router.post('/:followerNickName/:followingNickName', follow);

router.delete('/:followerNickName/:followingNickName', unfollow);

module.exports = router;
