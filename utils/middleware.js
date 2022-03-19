const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/User');

exports.logger = (req, res, next) => {
  logger.log('---');
  logger.log('Method:', req.method);
  logger.log('Path:', req.path);
  logger.log('Body', req.body);
  next();
};

exports.notFound = (req, res) => {
  return res.status(404).json({error: 'Not Found'});
};

exports.errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token Expired' });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  next(error);
};

exports.tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token =  auth.substring(7);
  }
  next();
};

exports.userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user.toJSON();
  }
  next();
};