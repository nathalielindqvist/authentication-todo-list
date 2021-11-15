"use strict";

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  // Requests credentials from body
  const { name, email, password, pic } = req.body;

  // Finds user via email
  const userExists = await User.findOne({ email });

  // If user is found, throw error
  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // If user can be created, assign credentials
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Error occured!')
  }
});

const authUser = asyncHandler(async (req, res) => {
  // Request credentials from body
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // If user exists and password matches, respond with full user object
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid email and/or password!')
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // Find user via unique id
  const user = await User.findById(req.user._id);

  // If user exists, autofill name, email and pic with current credentials.
  // If input is given, replace current credentials with that
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    // Only show the password if it is entered by the user.
    // Does not autofill current password
    if(req.body.password) {
      user.password = req.body.password;
    }

    // Save updated credentials in variable
    const updatedUser = await user.save();

    // Send updated credentials as response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
})

module.exports = { registerUser, authUser, updateUserProfile };