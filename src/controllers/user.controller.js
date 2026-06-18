const userService = require('../service/userService');
const catchAsync = require('../middlewares/catchAsync');
const { created, success, noContent, ok } = require('../helpers/response');

exports.createUser = catchAsync(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    return created(res, newUser, '✅ Usuario creado con éxito.');
});

exports.getUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsers();
    return ok(res, users);
});

exports.getUserByNickName = catchAsync(async (req, res) => {
    const user = await userService.getUserByNickName(req.params.nickName);
    return ok(res, user);
});

exports.updateUser = catchAsync(async (req, res) => {
    const updatedUser = await userService.updateUser(
        req.params.nickName,
        req.body
    );
    return success(res, updatedUser, 'Usuario actualizado con éxito.');
});

exports.deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req.params.nickName);
    return noContent(res);
});

exports.getUserPosts = catchAsync(async (req, res) => {
    const posts = await userService.getUserPosts(req.params.nickName);
    return ok(res, posts);
});

exports.getUserComments = catchAsync(async (req, res) => {
    const comments = await userService.getUserComments(req.params.nickName);
    return ok(res, comments);
});
