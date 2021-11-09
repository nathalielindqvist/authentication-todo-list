"use strict";

const dotenv = require("dotenv");
const express = require('express');
const notes = require('../frontend/src/data/notes');
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));