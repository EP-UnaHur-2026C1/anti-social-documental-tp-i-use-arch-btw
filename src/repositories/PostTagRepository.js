const { PostTag, Tag } = require('../models');

class PostTagRepository {
    async create(data) {
        return PostTag.create(data);
    }

    async findByPostId(postId) {
        const postTags = await PostTag.find({ post_id: postId }).lean();
        const tagIds = postTags.map((pt) => pt.tag_id);
        if (tagIds.length === 0) return [];
        const tags = await Tag.find({ _id: { $in: tagIds } }).lean();
        return tags;
    }

    async deleteByPostIdAndTagId(postId, tagId) {
        return PostTag.deleteOne({ post_id: postId, tag_id: tagId });
    }
}

module.exports = new PostTagRepository();
