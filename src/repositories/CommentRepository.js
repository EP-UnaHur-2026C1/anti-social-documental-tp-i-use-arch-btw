const { Comment } = require('../models');

const getVisibleCutoff = () => {
    const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return cutoff;
};

class CommentRepository {
    async create(commentData) {
        return Comment.create(commentData);
    }

    async findAll(page = 1, limit = 20) {
        const filter = { dateTime: { $gte: getVisibleCutoff() } };
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Comment.find(filter).sort({ dateTime: -1 }).skip(skip).limit(limit).lean(),
            Comment.countDocuments(filter),
        ]);
        return { data, total };
    }

    async findByPostId(postId, page = 1, limit = 20) {
        const filter = { post_id: postId, dateTime: { $gte: getVisibleCutoff() } };
        const skip = (page - 1) * limit;
        return Comment.find(filter).sort({ dateTime: -1 }).skip(skip).limit(limit).lean();
    }

    async findById(id) {
        return Comment.findById(id).lean();
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
