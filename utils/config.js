require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI;

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI,
  SECRET: process.env.SECRET,
};