"use strict";

const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks)
  });

  const createTask = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const task = new Task({ user: req.user._id, title, content, category });

    const createdTask = await task.save();

    res.status(201).json(createdTask);

  });

  const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can not perform this action");
    }

    if(task) {
      await task.remove();
      res.json({ message: "Task removed" });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  })

  module.exports = { getTasks, createTask, deleteTask };