const { PostImage } = require('../models');

class PostImageRepository {
    async create(data) {
        return PostImage.create(data);
    }

    async findByPostId(postId) {
        return PostImage.find({ post_id: postId }).lean();
    }

    async findById(id) {
        return PostImage.findById(id).lean();
    }

    async deleteById(id) {
        return PostImage.deleteOne({ _id: id });
    }
}

module.exports = new PostImageRepository();
