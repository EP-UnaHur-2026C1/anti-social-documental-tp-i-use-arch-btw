const followService = require('../service/followService');
const catchAsync = require('../middlewares/catchAsync');
const { ok } = require('../helpers/response');

exports.follow = catchAsync(async (req, res) => {
    const result = await followService.follow(
        req.params.followerNickName,
        req.params.followingNickName
    );
    return ok(res, result);
});

exports.unfollow = catchAsync(async (req, res) => {
    const result = await followService.unfollow(
        req.params.followerNickName,
        req.params.followingNickName
    );
    return ok(res, result);
});

exports.getFollowers = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const data = await followService.getFollowers(req.params.nick, page, limit);
    return ok(res, data);
});

exports.getFollowing = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const data = await followService.getFollowing(req.params.nick, page, limit);
    return ok(res, data);
});
