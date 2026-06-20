const { PostImage } = require('../models');

class PostImageRepository {
    async create(data) {
        return PostImage.create(data)
    }

    async findById(id) {
        return PostImage.findOne({ _id:id }).lean()
    }

    async deleteById(id) {
        return PostImage.deleteOne({ _id:id })
    }
}

module.exports = new PostImageRepository();
