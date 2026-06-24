const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema(
    {
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'El post es obligatorio.'],
        },
        tag_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            required: [true, 'El tag es obligatorio.'],
        },
    },
    { versionKey: false }
);

postTagSchema.index({ post_id: 1, tag_id: 1 }, { unique: true });

const PostTag = mongoose.model('PostTag', postTagSchema);
module.exports = PostTag;
