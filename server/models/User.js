const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const S = new Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['buyer', 'artisan'], default: 'buyer' },
  avatar:   { type: String, default: '' },
}, { timestamps: true });

S.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

S.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

S.set('toJSON', {
  transform: (_, obj) => { delete obj.password; return obj; }
});

module.exports = model('User', S);
