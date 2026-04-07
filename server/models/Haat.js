const { Schema, model } = require('mongoose');

const ParticipantSchema = new Schema({
  artisanId: { type: Schema.Types.ObjectId, ref: 'Artisan' },
  boothName: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  joinedAt: { type: Date, default: Date.now },
}, { _id: false });

const S = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String, default: '' },
  coverImage: { type: String, default: '/images/weaving-loom.jpg' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, default: '' },
  isOnline: { type: Boolean, default: false },
  hostArtisan: { type: Schema.Types.ObjectId, ref: 'Artisan', required: true },
  participants: [ParticipantSchema],
  maxParticipants: { type: Number, default: 20 },
  category: { type: String, default: 'Other' },
  tags: [String],
  isPublished: { type: Boolean, default: true },
  rsvpCount: { type: Number, default: 0 },
}, { timestamps: true });

S.pre('save', function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
});

module.exports = model('Haat', S);
