const { User, Comment, Post } = require('../models');

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
            User.find({}).skip(skip).limit(limit).lean(),
            User.countDocuments(),
        ]);
        return { data, total };
    }

    async findByNickName(nickName) {
        return User.findOne({ _id: nickName }).lean();
    }

    async findByEmail(email) {
        return User.findOne({ email }).lean();
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
