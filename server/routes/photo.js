const express = require('express');
const router = express.Router();
const { Photo, Template, PhotoSession, SavedPhoto, PhotoSticker } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await Photo.findAll({
      include: [Template, PhotoSession, SavedPhoto, PhotoSticker]
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Photo.findByPk(req.params.id, {
      include: [Template, PhotoSession, SavedPhoto, PhotoSticker]
    });
    if (!item) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photo', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await Photo.create(req.body);
    res.status(201).json({ message: 'Photo created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating photo', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Photo.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Photo not found for deletion' });
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting photo', error: error.message });
  }
});

module.exports = router;
