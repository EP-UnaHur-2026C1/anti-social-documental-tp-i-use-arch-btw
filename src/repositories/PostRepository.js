const { Post } = require('../models');

class PostRepository {
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Post.find().sort({ dateTime: -1 }).skip(skip).limit(limit).lean(),
            Post.countDocuments(),
        ]);
        return { data, total };
    }

    async findById(id) {
        return Post.findOne({ _id: id }).lean();
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
