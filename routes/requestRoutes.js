const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Pet = require('../models/Pet');
const verifyToken = require('../middleware/verifyToken');
router.post('/', verifyToken, async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/my-requests', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ userEmail: req.user.email });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/pet-requests/:petId', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ petId: req.params.petId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/approve/:id', verifyToken, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    await Pet.findByIdAndUpdate(request.petId, { status: 'adopted' });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/reject/:id', verifyToken, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request cancelled!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;