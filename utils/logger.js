require('dotenv').config();

const testing = process.env.NODE_ENV === 'test';

exports.log = (...args) => {
  if (!testing) console.log(...args);
};

exports.error = (...args) => {
  if (!testing) console.error(...args);
};