const AppError = require('../helpers/AppError');
const TagRepository = require('../repositories/TagRepository');

class TagService {
    async createTag(data) {
        const tag = await TagRepository.create(data);
        return tag;
    }

    async getAllTags(page = 1, limit = 20) {
        return TagRepository.findAll(page, limit);
    }

    async getTagById(id) {
        const tag = await TagRepository.findById(id);
        if (!tag) {
            throw new AppError('Etiqueta no encontrada.', 404);
        }
        return tag;
    }

    async updateTag(id, data) {
        const tag = await TagRepository.update(id, data);
        if (!tag) {
            throw new AppError('Etiqueta no encontrada.', 404);
        }
        return tag;
    }

    async deleteTag(id) {
        const result = await TagRepository.deleteById(id);
        if (!result.deletedCount) {
            throw new AppError('Etiqueta no encontrada.', 404);
        }
        return result;
    }
}

module.exports = new TagService();
