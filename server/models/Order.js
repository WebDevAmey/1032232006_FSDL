const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  artisanId: { type: Schema.Types.ObjectId, ref: 'Artisan' },
  name: String,
  price: Number,
  qty: Number,
  image: String,
}, { _id: false });

const S = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [ItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    name: String, line1: String, city: String,
    state: String, pin: String, phone: String,
  },
  paymentMethod: { type: String, default: 'cod' },
}, { timestamps: true });

module.exports = model('Order', S);
