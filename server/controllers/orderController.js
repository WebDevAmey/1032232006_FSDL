const Order = require('../models/Order');

exports.place = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, userId: req.user.id });
    res.status(201).json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getMine = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
