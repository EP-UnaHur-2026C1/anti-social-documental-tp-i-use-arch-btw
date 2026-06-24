const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
    {
        follower_nickName: {
            type: String,
            ref: 'User',
            required: [true, 'El seguidor es obligatorio.'],
        },
        following_nickName: {
            type: String,
            ref: 'User',
            required: [true, 'El seguido es obligatorio.'],
        },
    },
    { versionKey: false }
);

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
