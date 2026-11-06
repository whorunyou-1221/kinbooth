const express = require('express');
const router = express.Router();
const { Sticker } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await Sticker.findAll();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stickers', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Sticker.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Sticker not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sticker', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await Sticker.create(req.body);
    res.status(201).json({ message: 'Sticker created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating sticker', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Sticker.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Sticker not found for update' });
    const updatedItem = await Sticker.findByPk(req.params.id);
    res.status(200).json({ message: 'Sticker updated successfully', item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating sticker', error: error.message });
  }
});

module.exports = router;
