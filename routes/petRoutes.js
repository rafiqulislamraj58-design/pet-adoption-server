const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const verifyToken = require('../middleware/verifyToken');

router.get('/', async (req, res) => {
  try {
    const { search, species } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (species) {
      query.species = { $in: [species] };
    }

    const pets = await Pet.find(query);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', verifyToken, async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', verifyToken, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;