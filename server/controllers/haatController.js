const Haat = require('../models/Haat');
const { emitHaat } = require('../socket/inventorySocket');

exports.getAll = async (req, res) => {
  try {
    const filter = { isPublished: true };
    if (req.query.upcoming === 'true')
      filter.startDate = { $gte: new Date() };
    const limit = parseInt(req.query.limit) || 50;
    const haats = await Haat.find(filter)
      .populate('hostArtisan', 'shopName profileImage slug')
      .populate('participants.artisanId', 'shopName profileImage craft slug')
      .sort({ startDate: 1 })
      .limit(limit).lean();
    res.json(haats);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const haat = await Haat.findOne({ slug: req.params.slug })
      .populate('hostArtisan')
      .populate('participants.artisanId', 'shopName profileImage craft slug')
      .lean();
    if (!haat) return res.status(404).json({ message: 'Haat not found' });
    res.json(haat);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const haat = await Haat.create(req.body);
    res.status(201).json(haat);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
  try {
    const haat = await Haat.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(haat);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.joinRequest = async (req, res) => {
  try {
    const { artisanId, boothName } = req.body;
    const haat = await Haat.findByIdAndUpdate(
      req.params.id,
      { $push: { participants: { artisanId, boothName, status: 'pending' } } },
      { new: true }
    );
    emitHaat(req.app.get('io'), haat._id.toString(), { type: 'join_request' });
    res.json(haat);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateParticipant = async (req, res) => {
  try {
    const haat = await Haat.findOneAndUpdate(
      { _id: req.params.id, 'participants.artisanId': req.params.artisanId },
      { $set: { 'participants.$.status': req.body.status } },
      { new: true }
    );
    res.json(haat);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.rsvp = async (req, res) => {
  try {
    const haat = await Haat.findByIdAndUpdate(
      req.params.id,
      { $inc: { rsvpCount: 1 } },
      { new: true }
    );
    emitHaat(req.app.get('io'), haat._id.toString(), { rsvpCount: haat.rsvpCount });
    res.json({ rsvpCount: haat.rsvpCount });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
