const tagService = require('../service/tagService');
const catchAsync = require('../middlewares/catchAsync');
const { created, noContent, ok } = require('../helpers/response');

exports.createTag = catchAsync(async (req, res) => {
    const tag = await tagService.createTag(req.body);
    return created(res, tag, 'Etiqueta creada con éxito.');
});

exports.getTags = catchAsync(async (req, res) => {
    const tags = await tagService.getAllTags();
    return ok(res, tags);
});

exports.deleteTag = catchAsync(async (req, res) => {
    await tagService.deleteTag(req.params.id);
    return noContent(res);
});
