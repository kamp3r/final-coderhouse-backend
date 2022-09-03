const mongoose = require('mongoose');

const schema = mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  products: { type: mongoose.Schema.ObjectId, ref: 'products' },
  qty: { type: Number, require: true },
  client: { type: mongoose.Schema.ObjectId, ref: 'users' },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const ShoppingCart = mongoose.model('carts', schema);

module.exports = ShoppingCart;
