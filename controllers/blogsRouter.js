const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 });
  response.status(200).json({ data: blogs });
});

router.post('/', async (request, response) => {
  const content = request.body;

  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: 'Invalid token' });
  }
  const id = decodedToken.id;
  const user = await User.findById(id);

  if (!user) {
    return response.status('401').json({
      error: 'User does not exist',
    });
  }

  if (!content.url && !content.title) {
    return response.status(400).json({
      error: 'title and url are required',
    });
  }

  content.user = user._id;
  const blog = new Blog(content);
  const result = await blog.save();

  user.blogs = user.blogs.concat(result);
  await user.save();

  response.status(201).json({
    message: 'Blog entry created successfully',
    data: result,
  });
});

router.put('/:id', async (request, response) => {
  const id = request.params.id;

  // const blog = await Blog.findById(id);
  // if (blog.user.toString() !== request.user?.id) {
  //   return response.status(403).json({
  //     error: 'Permission denied'
  //   });
  // }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { ...request.body },
    { new: true }
  );
  response.status(200).json({
    message: 'Blog entry updated successfully',
    data: updatedBlog,
  });
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const token = request.token;

  if(!token) {
    return response.status(401).json({
      error: 'Token is required'
    });
  }
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({
      error: 'Blog not found'
    });
  }

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(403).json({
      error: 'Permission denied'
    });
  }

  await Blog.findByIdAndDelete(id);

  response.status(200).json({
    message: 'Blog entry deleted successfully',
  });
});

module.exports = router;
