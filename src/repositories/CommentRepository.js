const { Comment } = require('../models');

class CommentRepository {
    async create(commentData) {
        return Comment.create(commentData);
    }

    async findByContent(content) {
        return Comment.find({
            content: { $regex: content, $options: 'i' }
        }).lean();
    }

    async findAll() {
        return Comment.find({}).lean();
    }

    async update(id, commentData) {
        const comment = await Comment.findById(id);

        if (!comment) return null;

        Object.assign(comment, commentData);
        return await comment.save();
    }

    async deleteById(id) {
        return Comment.deleteOne({ _id: id });
    }
}

module.exports = new CommentRepository();