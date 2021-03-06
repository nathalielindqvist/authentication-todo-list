"use strict";

const express = require('express');
const {
  getTasks,
  createTask,
  deleteTask
} = require('../controllers/tasksController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getTasks);
router.route('/create').post(protect, createTask);
router.route('/:id').delete(protect, deleteTask);

module.exports = router;