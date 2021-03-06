"use strict";

const dotenv = require("dotenv");
const express = require('express');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express();

// Enables the use of .env file
dotenv.config();

// Enables connection to database
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));