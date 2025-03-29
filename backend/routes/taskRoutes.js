//routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth');

//create a new task
router.post('/', verifyToken, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all tasks for a user with optional filters
router.get('/', verifyToken, async (req, res) => {
  try {
    const filters = { user: req.user.id };
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.status) filters.status = req.query.status;
    
    const tasks = await Task.find(filters).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get a single task by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update a task
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete a task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
