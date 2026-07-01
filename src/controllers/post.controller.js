const postService = require('../service/postService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, noContent, ok } = require('../helpers/response');
const { paginated } = require('../helpers/pagination');

exports.getAllPosts = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, total } = await postService.getAllPosts(page, limit);
    return paginated(res, data, total, page, limit);
});

exports.getPostById = catchAsync(async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    return ok(res, post);
});

exports.createPost = catchAsync(async (req, res) => {
    const post = await postService.createPost(req.body);
    return created(res, post, 'Post creado con éxito.');
});

exports.deletePost = catchAsync(async (req, res) => {
    await postService.deletePost(req.params.id);
    return noContent(res);
});

exports.updatePost = catchAsync(async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body);
    return success(res, post, 'Post actualizado con éxito.');
});

exports.addPostImage = catchAsync(async (req, res) => {
    const { url } = req.body;
    const image = await postService.addPostImage(req.params.id, url);
    return created(res, image, 'Imagen agregada con éxito.');
});

exports.removePostImage = catchAsync(async (req, res) => {
    await postService.removePostImage(req.params.id, req.params.imageId);
    return noContent(res);
});

exports.getPostTags = catchAsync(async (req, res) => {
    const tags = await postService.getPostTags(req.params.id);
    return ok(res, tags);
});

exports.getPostImages = catchAsync(async (req, res) => {
    const images = await postService.getPostImages(req.params.id);
    return ok(res, images);
});

exports.addPostTag = catchAsync(async (req, res) => {
    const { tag_id } = req.body;
    const postTag = await postService.addPostTag(req.params.id, tag_id);
    return created(res, postTag, 'Etiqueta agregada al post con éxito.');
});

exports.removePostTag = catchAsync(async (req, res) => {
    await postService.removePostTag(req.params.id, req.params.tagId);
    return noContent(res);
});

exports.getPostComments = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const data = await postService.getPostComments(req.params.id, page, limit);
    return ok(res, data);
});
