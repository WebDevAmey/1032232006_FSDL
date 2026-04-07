const Product = require('../models/Product');
const Artisan = require('../models/Artisan');
const { emitStock } = require('../socket/inventorySocket');

function normalizeProductPayload(body = {}) {
  const rawCategory = body.category || 'Other';
  const categoryMap = {
    pottery: 'Pottery',
    textile: 'Textiles',
    textiles: 'Textiles',
    jewelry: 'Jewelry',
    jewellery: 'Jewelry',
    bakery: 'Bakery',
    leather: 'Leather',
    candle: 'Candles',
    candles: 'Candles',
    art: 'Art',
  };
  const normalizedCategory = categoryMap[String(rawCategory).toLowerCase()] || rawCategory;
  const images = Array.isArray(body.images)
    ? body.images
    : String(body.images || '')
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean);

  return {
    ...body,
    name: body.name || body.title || '',
    comparePrice: body.comparePrice || body.discountPrice || 0,
    category: normalizedCategory,
    images,
    tags: Array.isArray(body.tags)
      ? body.tags
      : String(body.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
  };
}

exports.getAll = async (req, res) => {
  try {
    const filter = { isLive: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.artisan) filter.artisanId = req.query.artisan;
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } },
      ];
    }
    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
    };
    const sort = sortMap[req.query.sort] || { createdAt: -1 };
    const limit = parseInt(req.query.limit) || 100;
    const products = await Product.find(filter)
      .populate('artisanId', 'shopName slug profileImage neighborhood')
      .sort(sort).limit(limit).lean();
    res.json(products);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getFeatured = async (req, res) => {
  try {
    const products = await Product.find({ isLive: true, isFeatured: true })
      .populate('artisanId', 'shopName slug')
      .limit(8).lean();
    res.json(products);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('artisanId').lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({ userId: req.user.id });
    if (!artisan) return res.status(400).json({ message: 'Create your artisan profile first' });
    const payload = normalizeProductPayload(req.body);
    const product = await Product.create({ ...payload, artisanId: artisan._id });
    res.status(201).json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({ userId: req.user.id });
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });
    if (!artisan || String(existing.artisanId) !== String(artisan._id)) {
      return res.status(403).json({ message: 'You can only update your own products' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id, normalizeProductPayload(req.body), { new: true, runValidators: true }
    );
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    if (stock === undefined || stock < 0)
      return res.status(400).json({ message: 'Valid stock required' });
    const product = await Product.findByIdAndUpdate(
      req.params.id, { stock }, { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Not found' });
    emitStock(req.app.get('io'), product._id.toString(), product.stock);
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isLive: false });
    res.json({ message: 'Product removed' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
