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

    async getTotalUsers() {
        return User.countDocuments({});
    }

    async findByNickName(nickName) {
        return User.findOne({ _id: nickName }).lean();
    }

    async getUserPosts(nickName) {
        return Post.find({ user_nickName: nickName }).lean();
    }

    async getUserComments(nickName) {
        return Comment.find({ user_nickName: nickName }).lean();
    }
}

module.exports = new UserRepository();
