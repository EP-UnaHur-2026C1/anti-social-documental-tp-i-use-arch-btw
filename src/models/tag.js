const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del tag es obligatorio.'],
            unique: true,
            trim: true,
        },
    },
    { versionKey: false }
);

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
