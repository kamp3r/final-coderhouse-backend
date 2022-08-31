const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: { type: String, required: true },
  cuerpo: { type: String, required: true },
  tipo: {
    type: String,
    enum: ['usuario', 'sistema'],
    default: 'usuario',
    required: true,
  },
  fyh: { type: Date, default: Date.now },
});

const Message = mongoose.model('mensajes', schema);

module.exports = Message;
