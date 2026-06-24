const { Follow } = require('../models');

class FollowRepository {
    async create(followerNickName, followingNickName) {
        return Follow.create({
            follower_nickName: followerNickName,
            following_nickName: followingNickName,
        });
    }

    async delete(followerNickName, followingNickName) {
        return Follow.deleteOne({
            follower_nickName: followerNickName,
            following_nickName: followingNickName,
        });
    }

    async findOne(followerNickName, followingNickName) {
        return Follow.findOne({
            follower_nickName: followerNickName,
            following_nickName: followingNickName,
        }).lean();
    }

    async findFollowers(nickName, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return Follow.find({ following_nickName: nickName }).skip(skip).limit(limit).lean();
    }

    async findFollowing(nickName, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return Follow.find({ follower_nickName: nickName }).skip(skip).limit(limit).lean();
    }
}

module.exports = new FollowRepository();
