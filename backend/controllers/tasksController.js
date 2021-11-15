"use strict";

const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

const getTasks = asyncHandler(async (req, res) => {

  // Finds tasks connected to logged in user
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks)
  });


  const createTask = asyncHandler(async (req, res) => {
    // Takes title, content and category from input fields
    const { title, content, category } = req.body;

    // Creates new task with users input and with users unique id as key
    const task = new Task({ user: req.user._id, title, content, category });

    const createdTask = await task.save();

    res.status(201).json(createdTask);

  });

  const deleteTask = asyncHandler(async (req, res) => {
    // Finds task based on id
    const task = await Task.findById(req.params.id);

    // Checks users id since only user who created the task can remove it
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