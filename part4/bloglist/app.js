const express = require('express');
const config = require('./utils/config');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;