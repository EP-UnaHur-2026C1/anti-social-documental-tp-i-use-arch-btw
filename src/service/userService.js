const AppError = require('../helpers/AppError');
const UserRepository = require('../repositories/UserRepository');

class UserService {
    async createUser(userData) {
        const existingUser = await UserRepository.findByNickName(
            userData.nickName
        );

        if (existingUser) {
            throw new AppError(
                'El nickName o el email ya están registrados.',
                409
            );
        }

        const existingEmail = await UserRepository.findByEmail(
            userData.email
        );

        if (existingEmail) {
            throw new AppError(
                'El nickName o el email ya están registrados.',
                409
            );
        }

        const newUser = await UserRepository.create(userData);
        return newUser;
    }

    async getAllUsers(page = 1, limit = 20) {
        return UserRepository.getAll(page, limit);
    }

    async getUserByNickName(nickName) {
        const user = await UserRepository.findByNickName(nickName);

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return user;
    }

    async updateUser(nickName, userData) {
        const result = await UserRepository.updateByNickName(
            nickName,
            userData
        );

        if (!result.matchedCount) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return this.getUserByNickName(nickName);
    }

    async deleteUser(nickName) {
        const result = await UserRepository.deleteByNickName(nickName);

        if (!result.deletedCount) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return result;
    }

    async getUserPosts(nickName) {
        const user = await UserRepository.findByNickName(nickName);

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return UserRepository.getUserPosts(nickName);
    }

    async getUserComments(nickName) {
        const user = await UserRepository.findByNickName(nickName);

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return UserRepository.getUserComments(nickName);
    }
}

module.exports = new UserService();
