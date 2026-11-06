const express = require('express');
const router = express.Router();
const { PhotoSticker, Photo, Sticker } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await PhotoSticker.findAll({ include: [Photo, Sticker] });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photo stickers', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await PhotoSticker.create(req.body);
    res.status(201).json({ message: 'Photo sticker created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating photo sticker', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PhotoSticker.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Photo sticker not found for deletion' });
    res.status(200).json({ message: 'Photo sticker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting photo sticker', error: error.message });
  }
});

module.exports = router;
