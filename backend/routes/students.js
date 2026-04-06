const express = require('express');
const router  = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single student by rollNo
router.get('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create student
router.post('/', async (req, res) => {
  const { firstName, lastName, rollNo, password, confirmPassword, contactNumber } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const student = new Student({ firstName, lastName, rollNo, password, contactNumber });
  try {
    const saved = await student.save();
    const { password: _, ...rest } = saved.toObject();
    res.status(201).json(rest);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Roll No already exists' });
    res.status(400).json({ message: err.message });
  }
});

// PUT update student by rollNo
router.put('/:rollNo', async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.rollNo;            // rollNo is the key, not updatable
    delete updates.confirmPassword;
    delete updates.password;          // password not editable via update

    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      updates,
      { returnDocument: 'after', runValidators: true }
    ).select('-password');

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE student by rollNo
router.delete('/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
