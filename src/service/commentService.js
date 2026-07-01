const AppError = require('../helpers/AppError');
const commentRepository = require('../repositories/CommentRepository');
const { User, Post } = require('../models');

class CommentService {
    async createComment(commentData) {
        const user = await User.findById(commentData.user_nickName);
        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }
        const post = await Post.findById(commentData.post_id);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        const newComment = await commentRepository.create(commentData);
        await Post.findByIdAndUpdate(commentData.post_id, { $inc: { commentsCount: 1 } });
        return newComment;
    }

    async getComments(page = 1, limit = 20) {
        return commentRepository.findAll(page, limit);
    }

    async getCommentById(id) {
        const comment = await commentRepository.findById(id);
        if (!comment) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return comment;
    }

    async updateComment(id, commentData) {
        const updatedComment = await commentRepository.update(id, commentData);
        if (!updatedComment) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return updatedComment;
    }

    async deleteComment(id) {
        const commentDoc = await commentRepository.findById(id);
        if (!commentDoc) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        await Post.findByIdAndUpdate(commentDoc.post_id, { $inc: { commentsCount: -1 } });
        return commentRepository.deleteById(id);
    }
}
module.exports = new CommentService();
