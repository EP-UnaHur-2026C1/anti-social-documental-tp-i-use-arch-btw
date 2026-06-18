const { Comment } = require('../models');

class CommentRepository {
    async create(commentData) {}

    async findByContent(content) {}

    async findAll() {}

    async update(id, commentData) {}

    async delete(id) {}
}

module.exports = new CommentRepository();
