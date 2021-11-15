"use strict";

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async(req, res, next) => {
  let token;

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Splits token from rest of header
    try {
      token = req.headers.authorization.split(" ")[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Selects password from user which decoded token id belongs to
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if(!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };