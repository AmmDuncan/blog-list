require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/userRouter');
const blogsRouter = require('./controllers/blogsRouter');
const loginRouter = require('./controllers/login');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => { logger.log('connected to MongoDB'); })
  .catch((err) => { logger.error('error connection to MongoDB:', err.message); });

app.use(cors());
app.use(express.json());
app.use(middleware.logger);
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/login', loginRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);


module.exports = app;