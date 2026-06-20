const { Post } = require('../models');

const getVisibleCommentsWhere = () => {
    const months = Number(process.env.COMMENT_VISIBILITY_MONTHS) || 6;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return { dateTime: { $gte: cutoff } };
};

class PostRepository {
    async findAll() {
        return Post.find().populate ({
                            path: 'comments',
                            match: getVisibleCommentsWhere()
                                    }).lean();
    }

    async findById(id) {
        return Post.findOne({ _id:id }).populate ({
                            path: 'comments',
                            match: getVisibleCommentsWhere()
                                    }).lean();
    }

    async create(data) {
        return Post.create(data);
    }

    async update(id, data) {
        const post = await Post.findById(id);
        
        if (!post) return null;

        Object.assign(post, data);
        return await post.save();
    }

    async deleteById(id) {
        return Post.deleteOne({ _id: id });
    }
}

module.exports = new PostRepository();
