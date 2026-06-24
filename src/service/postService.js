const AppError = require('../helpers/AppError');
const PostRepository = require('../repositories/PostRepository');
const PostImageRepository = require('../repositories/PostImageRepository');
const CommentRepository = require('../repositories/CommentRepository');
const { User, Tag, PostTag } = require('../models');

class PostService {
    async getAllPosts(page = 1, limit = 20) {
        return PostRepository.findAll(page, limit);
    }

    async getPostById(id) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        return post;
    }

    async createPost(data) {
        const user = await User.findOne({ _id: data.user_nickName });
        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        const { images, tags, ...postData } = data;
        const post = await PostRepository.create(postData);

        if (images && images.length > 0) {
            for (const url of images) {
                await PostImageRepository.create({
                    url_image: url,
                    post_id: post._id,
                });
            }
        }

        if (tags && tags.length > 0) {
            for (const name of tags) {
                let tag = await Tag.findOne({ name });
                if (!tag) {
                    tag = await Tag.create({ name });
                }
                await PostTag.create({ post_id: post._id, tag_id: tag._id });
            }
        }

        return PostRepository.findById(post._id);
    }

    async updatePost(id, data) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        return PostRepository.update(id, data);
    }

    async deletePost(id) {
        const result = await PostRepository.deleteById(id);
        if (!result.deletedCount) {
            throw new AppError('Post no encontrado.', 404);
        }
        return result;
    }

    async addPostImage(postId, url) {
        const post = await PostRepository.findById(postId);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        const image = await PostImageRepository.create({
            url_image: url,
            post_id: postId,
        });
        return image;
    }

    async removePostImage(imageId) {
        const result = await PostImageRepository.deleteById(imageId);
        if (!result.deletedCount) {
            throw new AppError('Imagen no encontrada.', 404);
        }
        return result;
    }

    async addPostTag(postId, tagId) {
        const post = await PostRepository.findById(postId);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        const tag = await Tag.findOne({ _id: tagId });
        if (!tag) {
            throw new AppError('Etiqueta no encontrada.', 404);
        }
        const postTag = await PostTag.create({
            post_id: postId,
            tag_id: tagId,
        });
        return postTag;
    }

    async removePostTag(postId, tagId) {
        const result = await PostTag.deleteOne({
            post_id: postId,
            tag_id: tagId,
        });
        if (!result.deletedCount) {
            throw new AppError('Relación post-etiqueta no encontrada.', 404);
        }
        return true;
    }

    async getPostComments(postId, page = 1, limit = 20) {
        const post = await PostRepository.findById(postId);
        if (!post) {
            throw new AppError('Post no encontrado.', 404);
        }
        return CommentRepository.findByPostId(postId, page, limit);
    }
}

module.exports = new PostService();
