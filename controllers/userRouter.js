const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('@/models/User');

router.get('/', async (request, response) => {
  const users = await User.find({});

  return response.status(200).send({
    users
  });
});

router.post('/', async (request, response) => {
  const { username = '', password = '' } = request.body;

  // if username or password is not provided, send error back to user
  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username and password are required' });
  }

  //username should be at least 3 chars long
  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: 'username should be at least 3 characters long' });
  }

  //password should be at least 3 chars long
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

  const user = new User({ username, passwordHash, blogs: [] });
  await user.save();

  return response.status(201).send({
    message: 'User created successfully',
    user
  });
});

module.exports  = router;