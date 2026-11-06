const express = require('express');
const router = express.Router();
const { Collage } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await Collage.findAll();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collages', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Collage.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Collage not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collage', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await Collage.create(req.body);
    res.status(201).json({ message: 'Collage created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating collage', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Collage.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Collage not found for update' });
    const updatedItem = await Collage.findByPk(req.params.id);
    res.status(200).json({ message: 'Collage updated successfully', item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating collage', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Collage.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Collage not found for deletion' });
    res.status(200).json({ message: 'Collage deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting collage', error: error.message });
  }
});

module.exports = router;
