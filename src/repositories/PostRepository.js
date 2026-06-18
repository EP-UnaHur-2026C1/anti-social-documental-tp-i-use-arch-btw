const { Post } = require('../models');

const getVisibleCommentsWhere = () => {
    const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return { dateTime: { [Op.gte]: cutoff } };
};

class PostRepository {
    async findAll() {}

    async findById(id) {}

    async create(data) {}

    async update(post, data) {}

    async deleteById(id) {}
}

module.exports = new PostRepository();
