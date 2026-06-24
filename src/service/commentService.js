const AppError = require('../helpers/AppError');
const commentRepository = require('../repositories/CommentRepository');

class CommentService {
    async createComment(commentData) {
        const newComment = await commentRepository.create(commentData);
        return newComment;
    }

    async getComments(page = 1, limit = 20) {
        return commentRepository.findAll(page, limit);
    }

    async updateComment(id, commentData) {
        const updatedComment = await commentRepository.update(id, commentData);
        if (!updatedComment) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return updatedComment;
    }

    async deleteComment(id) {
        const comment = await commentRepository.deleteById(id);
        if (!comment.deletedCount) {
            throw new AppError(`Comentario con id ${id} no encontrado.`, 404);
        }
        return comment;
    }
}
module.exports = new CommentService();
