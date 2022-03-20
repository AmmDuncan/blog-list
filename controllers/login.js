const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();

// models
const User = require('../models/User');

router.post('/', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    const both = !username && !password;
    let subject = 
      `${!username ? 'username' : ''}${both ? ' and ': ''}${!password ? 'password' : ''}`;

    response.status(400).json({
      error: `${subject} cannot be empty`
    });
  }

  // check if username exist
  const user = await User.findOne({username});
  if (!user) {
    response.status(401).json({
      error: 'Invalid login details'
    });
  }

  // check if password matches user
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    response.status(401).json({
      error: 'Invalid login details',
    });
  }
  const userForToken = {
    username,
    name: user.name,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60 * 60});
  response.status(200).json({
    data: {
      user: userForToken,
      token
    }
  });
});

module.exports = router;