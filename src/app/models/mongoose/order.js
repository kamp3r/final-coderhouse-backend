const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  products: [
    {
      code: String,
      name: String,
      description: String,
      price: Number,
      picture: String,
      qty: Number,
    },
  ],
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['generated', 'sended'], default: 'generated' },
  timestamp: { type: Date, default: Date.now },
});

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
