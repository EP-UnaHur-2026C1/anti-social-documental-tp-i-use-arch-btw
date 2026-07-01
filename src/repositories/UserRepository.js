const { User, Follow, Post, Comment } = require('../models');

class UserRepository {
    async create(userData) {
        return User.create(userData);
    }

    async updateByNickName(nickName, userData) {
        return User.updateOne(
            {
                _id: nickName,
            },
            {
                $set: {
                    name: userData.name,
                    surname: userData.surname,
                },
            }
        );
    }

    async deleteByNickName(nickName) {
        return User.deleteOne({ _id: nickName });
    }

    async getAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this._enrichUsers(User.aggregate([{ $skip: skip }, { $limit: limit }])),
            User.countDocuments(),
        ]);
        return { data, total };
    }

    async findByNickName(nickName) {
        const [user] = await this._enrichUsers(User.aggregate([{ $match: { _id: nickName } }]));
        return user || null;
    }

    async findByEmail(email) {
        return User.findOne({ email }).lean();
    }

    async _enrichUsers(pipeline) {
        const enriched = await pipeline
            .lookup({ from: 'follows', let: { nick: '$_id' }, pipeline: [{ $match: { $expr: { $eq: ['$follower_nickName', '$$nick'] } } }, { $count: 'count' }], as: 'followingCalc' })
            .lookup({ from: 'posts', let: { nick: '$_id' }, pipeline: [{ $match: { $expr: { $eq: ['$user_nickName', '$$nick'] } } }, { $count: 'count' }], as: 'postsCalc' })
            .lookup({ from: 'comments', let: { nick: '$_id' }, pipeline: [{ $match: { $expr: { $eq: ['$user_nickName', '$$nick'] } } }, { $count: 'count' }], as: 'commentsCalc' });
        return enriched.map(u => ({
            ...u,
            following: u.followingCalc?.[0]?.count ?? 0,
            postsCount: u.postsCalc?.[0]?.count ?? 0,
            commentsCount: u.commentsCalc?.[0]?.count ?? 0,
            followingCalc: undefined,
            postsCalc: undefined,
            commentsCalc: undefined,
        }));
    }

    async getUserPosts(nickName, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return Post.find({ user_nickName: nickName }).sort({ dateTime: -1 }).skip(skip).limit(limit).lean();
    }

    async getUserComments(nickName) {
        const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - months);
        return Comment.find({ user_nickName: nickName, dateTime: { $gte: cutoff } }).lean();
    }
}

module.exports = new UserRepository();
