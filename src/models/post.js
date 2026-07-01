const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user_nickName: {
            type: String,
            ref: 'User',
            required: [true, 'El usuario es obligatorio.'],
        },
        description: {
            type: String,
            required: [true, 'El campo descripción no puede estar vacío.'],
        },
        dateTime: {
            type: Date,
            default: Date.now,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
