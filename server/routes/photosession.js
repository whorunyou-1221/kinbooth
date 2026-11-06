const express = require('express');
const router = express.Router();
const { PhotoSession, Photo, Collage, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await PhotoSession.findAll({
      include: [Photo, Collage, User]
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photo sessions', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await PhotoSession.findByPk(req.params.id, {
      include: [Photo, Collage, User]
    });
    if (!item) return res.status(404).json({ message: 'Photo session not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photo session', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await PhotoSession.create(req.body);
    res.status(201).json({ message: 'Photo session created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating photo session', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await PhotoSession.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Photo session not found for update' });
    const updatedItem = await PhotoSession.findByPk(req.params.id);
    res.status(200).json({ message: 'Photo session updated successfully', item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating photo session', error: error.message });
  }
});

module.exports = router;
