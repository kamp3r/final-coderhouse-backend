const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: false },
    age: { type: Number, required: false },
    telephone: { type: String, required: true },
    picture: { type: String }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) { delete ret._id }
});

const User = mongoose.model('users', schema);

module.exports = User;