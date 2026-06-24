const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, 'El campo nick name es obligatorio.'],
        },
        email: {
            type: String,
            required: [true, 'El campo email es obligatorio'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'El campo nombre es obligatorio.'],
        },
        surname: { type: String },
        followers: { type: Number, default: 0 },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
        versionKey: false,
    }
);

userSchema
    .virtual('nickName')
    .get(function () {
        return this._id;
    })
    .set(function (v) {
        this._id = v;
    });

const User = mongoose.model('User', userSchema);
module.exports = User;
