const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: { type: String, required: true },
  body: { type: String, required: true },
  type: {
    type: String,
    enum: ['user', 'system'],
    default: 'user',
    required: true,
  },
  fyh: { type: Date, default: Date.now },
});

const Message = mongoose.model('messages', schema);

module.exports = Message;
