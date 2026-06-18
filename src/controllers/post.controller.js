const postService = require('../service/postService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, noContent, ok } = require('../helpers/response');

exports.getAllPosts = catchAsync(async (req, res) => {
    const posts = await postService.getAllPosts();
    return ok(res, posts);
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
    await postService.removePostImage(req.params.imageId);
    return noContent(res);
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
