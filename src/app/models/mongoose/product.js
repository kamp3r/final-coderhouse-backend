const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  picture: { type: String, required: false },
  category: { type: String, required: true},
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model('products', schema);

module.exports = Product;
