const express = require('express');
const router = express.Router();
const { Template } = require('../models');

router.get('/', async (req, res) => {
  try {
    const list = await Template.findAll();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Template.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template', error: error.message });
  }
});

router.post('/new', async (req, res) => {
  try {
    const newItem = await Template.create(req.body);
    res.status(201).json({ message: 'Template created successfully', item: newItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating template', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Template.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Template not found for update' });
    const updatedItem = await Template.findByPk(req.params.id);
    res.status(200).json({ message: 'Template updated successfully', item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: 'Error updating template', error: error.message });
  }
});

module.exports = router;
