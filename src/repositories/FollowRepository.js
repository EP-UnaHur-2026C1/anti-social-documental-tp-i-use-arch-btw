const { Follow } = require('../models');

class FollowRepository {
    async create(followerNickName, followingNickName) {
        return Follow.create({
            follower_nickName: followerNickName,
            following_nickName: followingNickName
        });
    }

    async delete(followerNickName, followingNickName) {
        return Follow.deleteOne({
            follower_nickName: followerNickName,
            following_nickName: followingNickName
        });
    }

    async findOne(followerNickName, followingNickName) {
        return Follow.findOne({
            follower_nickName: followerNickName,
            following_nickName: followingNickName
        }).lean();
    }

    async findFollowers(nickName) {
        return Follow.find({
            following_nickName: nickName
        }).lean();
    }

    async findFollowing(nickName) {
        return Follow.find({
            follower_nickName: nickName
        }).lean();
    }
}

module.exports = new FollowRepository();