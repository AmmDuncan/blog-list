const {log} = require("../utils/logger");

module.exports = (req, res, next) => {
  log('---');
  log('Method:', req.method);
  log('Path: ', req.path);
  log('Body: ', req.body);
  next()
}