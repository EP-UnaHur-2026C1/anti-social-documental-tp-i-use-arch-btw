const { Follow } = require('../models');

class FollowRepository {
    async create(followerNickName, followingNickName) {}

    async delete(followerNickName, followingNickName) {}

    async findOne(followerNickName, followingNickName) {}
}

module.exports = new FollowRepository();
