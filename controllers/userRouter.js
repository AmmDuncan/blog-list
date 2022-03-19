const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.status(200).send({data: users});
});

router.post('/', async (request, response) => {
  const password = request.body.password;
  const username = request.body.username;
  const name = request.body.name;

  // if username of password is empty respond with invalid
  if (!username || !password) {
    response.status(404).json({
      error: 'password and username are required'
    });
  }

  // username should be at least 3 chars long
  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username should be at least 3 characters long' });
  }

  // password should be at least 3 chars long
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password should be at least 3 characters long' });
  }

  // check if user with username exists
  const exists = await User.findOne({ username });

  // if exists send back error to user
  if (exists) {
    return response
      .status(400)
      .json({ error: 'username taken' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash, blogs: [] });
  await user.save();

  response.status(201).json({
    message: 'User created successfully',
    data: user
  });
});

module.exports = router;