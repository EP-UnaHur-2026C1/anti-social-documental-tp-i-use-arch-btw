const mongoose = require('mongoose');

const postImageSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'El post es obligatorio.'],
    },
    url_image: {
        type: String,
        required: [true, 'La URL de la imagen es obligatoria.'],
        trim: true,
    },
});

const PostImage = mongoose.model('PostImage', postImageSchema);
module.exports = PostImage;
