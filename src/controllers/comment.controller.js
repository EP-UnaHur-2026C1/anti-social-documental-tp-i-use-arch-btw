const commentService = require('../service/commentService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, ok, noContent } = require('../helpers/response');
const { paginated } = require('../helpers/pagination');

exports.createComment = catchAsync(async (req, res) => {
    const newComment = await commentService.createComment(req.body);
    return created(res, newComment, 'Comentario creado con éxito.');
});

exports.updateComment = catchAsync(async (req, res) => {
    const updatedComment = await commentService.updateComment(
        req.params.id,
        req.body
    );
    return success(res, updatedComment, 'Comentario actualizado con éxito.');
});

exports.getComments = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { data, total } = await commentService.getComments(page, limit);
    return paginated(res, data, total, page, limit);
});

exports.deleteComment = catchAsync(async (req, res) => {
    await commentService.deleteComment(req.params.id);
    return noContent(res);
});
