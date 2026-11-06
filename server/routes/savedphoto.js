const express = require('express');
const router = express.Router();
const { SavedPhoto, User, Photo } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await SavedPhoto.findAll({ include: [User, Photo] });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved photos', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await SavedPhoto.findByPk(req.params.id, { include: [User, Photo] });
    if (!item) return res.status(404).json({ message: 'Saved photo not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved photo', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await SavedPhoto.create(req.body);
    res.status(201).json({ message: 'Photo saved successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error saving photo', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SavedPhoto.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Saved photo not found for deletion' });
    res.status(200).json({ message: 'Saved photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting saved photo', error: error.message });
  }
});

module.exports = router;
