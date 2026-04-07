const Artisan = require('../models/Artisan');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Haat = require('../models/Haat');

function normalizeArtisanPayload(body = {}) {
  const brandName = body.brandName || body.shopName || '';
  const instagram = body.socialLinks?.instagram || body.instagram || '';
  const website = body.socialLinks?.website || body.website || '';

  return {
    ...body,
    brandName,
    shopName: body.shopName || brandName,
    artisanName: body.artisanName || body.name || '',
    shortBio: body.shortBio || body.bio || '',
    bio: body.bio || body.shortBio || '',
    craft: body.craft || body.category || 'Other',
    category: body.category || body.craft || 'Other',
    coverImage: body.coverImage || body.bannerImage || '',
    bannerImage: body.bannerImage || body.coverImage || '',
    instagram,
    website,
    socialLinks: {
      instagram,
      website,
    },
  };
}

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.craft) filter.craft = req.query.craft;
    if (req.query.city) filter.city = req.query.city;
    const artisans = await Artisan.find(filter).lean();
    res.json(artisans);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({ slug: req.params.slug }).lean();
    if (!artisan) return res.status(404).json({ message: 'Artisan not found' });
    const products = await Product.find({ artisanId: artisan._id, isLive: true }).lean();
    res.json({ ...artisan, products });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const exists = await Artisan.findOne({ userId: req.user.id });
    if (exists) return res.status(409).json({ message: 'Profile already exists' });
    const artisan = await Artisan.create({ ...normalizeArtisanPayload(req.body), userId: req.user.id });
    res.status(201).json(artisan);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
  try {
    const existing = await Artisan.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Artisan not found' });
    if (String(existing.userId) !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own artisan profile' });
    }

    const artisan = await Artisan.findByIdAndUpdate(
      req.params.id, normalizeArtisanPayload(req.body), { new: true, runValidators: true }
    );
    res.json(artisan);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getMine = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({ userId: req.user.id }).lean();
    if (!artisan) return res.status(404).json({ message: 'Artisan profile not found' });
    res.json(artisan);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getDashboard = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({ userId: req.user.id }).lean();
    if (!artisan) return res.status(404).json({ message: 'Artisan profile not found' });

    const [products, totalOrders, joinedHaats] = await Promise.all([
      Product.find({ artisanId: artisan._id }).sort({ createdAt: -1 }).lean(),
      Order.countDocuments({ 'items.artisanId': artisan._id }),
      Haat.countDocuments({
        $or: [
          { hostArtisan: artisan._id },
          { 'participants.artisanId': artisan._id },
        ],
      }),
    ]);

    res.json({
      artisan,
      products,
      stats: {
        totalProducts: products.length,
        totalOrders,
        haatsJoined: joinedHaats,
      },
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
