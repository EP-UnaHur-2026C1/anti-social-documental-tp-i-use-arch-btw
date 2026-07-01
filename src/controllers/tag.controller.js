const tagService = require('../service/tagService');
const catchAsync = require('../middlewares/catchAsync');
const { created, noContent, ok } = require('../helpers/response');
const { paginated } = require('../helpers/pagination');

exports.createTag = catchAsync(async (req, res) => {
    const tag = await tagService.createTag(req.body);
    return created(res, tag, 'Etiqueta creada con éxito.');
});

exports.getTags = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, total } = await tagService.getAllTags(page, limit);
    return paginated(res, data, total, page, limit);
});

exports.getTagById = catchAsync(async (req, res) => {
    const tag = await tagService.getTagById(req.params.id);
    return ok(res, tag);
});

exports.updateTag = catchAsync(async (req, res) => {
    const tag = await tagService.updateTag(req.params.id, req.body);
    return ok(res, tag, 'Etiqueta actualizada con éxito.');
});

exports.deleteTag = catchAsync(async (req, res) => {
    await tagService.deleteTag(req.params.id);
    return noContent(res);
});
