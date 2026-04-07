const { Schema, model } = require('mongoose');

const S = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true, trim: true },
  brandName: { type: String, default: '', trim: true },
  artisanName: { type: String, default: '', trim: true },
  slug: { type: String, unique: true, sparse: true },
  tagline: { type: String, default: '' },
  bio: { type: String, default: '', maxlength: 600 },
  shortBio: { type: String, default: '', maxlength: 300 },
  story: { type: String, default: '' },
  craft: { type: String, default: 'Other' },
  category: { type: String, default: 'Other' },
  neighborhood: { type: String, default: '' },
  city: { type: String, default: 'Pune' },
  phone: { type: String, default: '' },
  yearsOfExperience: { type: Number, default: 0 },
  profileImage: { type: String, default: '/images/potter-wheel.jpg' },
  coverImage: { type: String, default: '/images/weaving-loom.jpg' },
  bannerImage: { type: String, default: '' },
  process: [{
    step: { type: String },
    description: { type: String },
  }],
  businessType: { type: String, enum: ['individual', 'family', 'small brand'], default: 'individual' },
  teamSize: { type: Number, default: 1 },
  foundedYear: { type: Number, default: null },
  materialsUsed: { type: String, default: '' },
  processDescription: { type: String, default: '' },
  sustainabilityNote: { type: String, default: '' },
  isHomeBasedBusiness: { type: Boolean, default: true },
  acceptsCustomOrders: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  instagram: { type: String, default: '' },
  website: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    website: { type: String, default: '' },
  },
}, { timestamps: true });

S.pre('save', function () {
  if (!this.shopName && this.brandName) {
    this.shopName = this.brandName;
  }

  if (!this.slug && this.shopName) {
    this.slug = this.shopName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = model('Artisan', S);
