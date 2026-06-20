const { Tag } = require('../models');

class TagRepository {
    async create(data) {
        return Tag.create(data);
    }

    async findAll() {
        return Tag.find({}).lean()
    }

    async findById(id) {
        return Tag.findOne({ _id:id }).lean()
    }

    async deleteById(id) {
        return Tag.deleteOne({ _id:id })
    }
}

module.exports = new TagRepository();
