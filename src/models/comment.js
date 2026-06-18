const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_nickName: {
        type: String,
        ref: 'User',
        required: [true, 'El usuario es obligatorio.'],
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'El post es obligatorio.'],
    },
    content: {
        type: String,
        required: [true, 'El comentario no puede estar vacío.'],
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    visible: {
        type: Boolean,
        default: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
