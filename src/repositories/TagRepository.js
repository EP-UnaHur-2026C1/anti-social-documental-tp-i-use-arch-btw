const { Tag } = require('../models');

class TagRepository {
    async create(data) {
        return Tag.create(data);
    }

    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Tag.find({}).skip(skip).limit(limit).lean(),
            Tag.countDocuments(),
        ]);
        return { data, total };
    }

    async findById(id) {
        return Tag.findOne({ _id: id }).lean();
    }

    async update(id, data) {
        return Tag.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    }

    async deleteById(id) {
        return Tag.deleteOne({ _id: id });
    }
}

module.exports = new TagRepository();
