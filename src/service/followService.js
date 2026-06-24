const AppError = require('../helpers/AppError');
const FollowRepository = require('../repositories/FollowRepository');
const { User } = require('../models');

class FollowService {
    async follow(followerNickName, followingNickName) {
        if (followerNickName === followingNickName) {
            throw new AppError('No podés seguirte a vos mismo.', 400);
        }

        const followingUser = await User.findOne({ _id: followingNickName });
        if (!followingUser) {
            throw new AppError('Usuario a seguir no encontrado.', 404);
        }

        const followerUser = await User.findOne({ _id: followerNickName });
        if (!followerUser) {
            throw new AppError('Tu usuario no existe.', 404);
        }

        const existingFollow = await FollowRepository.findOne(
            followerNickName,
            followingNickName
        );

        if (existingFollow) {
            throw new AppError('Ya seguís a este usuario.', 409);
        }

        await FollowRepository.create(followerNickName, followingNickName);
        await User.updateOne(
            { _id: followingNickName },
            { $inc: { followers: 1 } }
        );
        return { message: `Ahora seguís a ${followingNickName}.` };
    }

    async unfollow(followerNickName, followingNickName) {
        const result = await FollowRepository.delete(
            followerNickName,
            followingNickName
        );
        if (!result.deletedCount) {
            throw new AppError('No seguís a este usuario.', 404);
        }

        await User.updateOne(
            { _id: followingNickName },
            { $inc: { followers: -1 } }
        );
        return {
            message: `Dejaste de seguir a ${followingNickName}.`,
        };
    }

    async getFollowers(nick, page = 1, limit = 20) {
        return FollowRepository.findFollowers(nick, page, limit);
    }

    async getFollowing(nick, page = 1, limit = 20) {
        return FollowRepository.findFollowing(nick, page, limit);
    }
}

module.exports = new FollowService();
