const { Schema, model } = require('mongoose');

const CATS = ['Pottery', 'Textiles', 'Bakery', 'Jewelry', 'Candles',
  'Leather', 'Ceramics', 'Handloom', 'Art', 'Other'];

const S = new Schema({
  artisanId: { type: Schema.Types.ObjectId, ref: 'Artisan', required: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, default: 0 },
  category: { type: String, enum: CATS, default: 'Other' },
  images: [{ type: String }],
  stock: { type: Number, default: 0, min: 0 },
  unit: { type: String, default: 'piece' },
  tags: [{ type: String }],
  isFestivalEligible: { type: Boolean, default: true },
  isCustomizable: { type: Boolean, default: false },
  isLive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

S.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
});

S.index({ category: 1, isLive: 1 });
S.index({ artisanId: 1 });

module.exports = model('Product', S);
