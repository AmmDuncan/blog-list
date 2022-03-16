const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const helpers = require('./test_helpers');

const api = supertest(app);

describe('blog list api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogList = helpers.initialBlogs.map((blog) => new Blog(blog));
    const saveList = blogList.map((blog) => blog.save());
    await Promise.all(saveList);
  }, 100000);

  test('returns blogs list in json format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toBe(200);

    const blogList = response.body;
    expect(blogList.length).toEqual(helpers.initialBlogs.length);

    const titles = blogList.map((blog) => blog.title);
    expect(titles).toContain('CSS Box Model');
  }, 10000);

  test('returns blogs with id property set', async () => {
    const response = await api.get('/api/blogs');
    const post = response.body[0];
    expect(post.id).toBeDefined();
  });

  test('saves new item to blog list', async () => {
    const newBlog = {
      title: 'Test blog',
      likes: 6,
      url: 'https://test.com',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);

    const blogList = await Blog.find({});
    expect(blogList).toHaveLength(helpers.initialBlogs.length + 1);
  });

  test('likes property defaults to 0 if not provided', async () => {
    const newBlog = {
      title: 'Test blog',
      url: 'https://test.com',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(201);

    const blogList = await Blog.find({ title: 'Test blog' });
    expect(blogList[0].likes).toBe(0);
  });

  test('returns 400 if title or url is missing', async () => {
    const newBlog = {};
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.status).toBe(400);
  });

  test('can remove blog item from list', async () => {
    const blogList = await Blog.find({});
    const itemToDelete = blogList[0];
    const response = await api.delete(`/api/blogs/${itemToDelete.id}`);
    expect(response.status).toBe(204);
  });

  test('can update likes on a blog', async () => {
    const blogList = await Blog.find({});
    const firstBlog = blogList[0].toJSON();
    const newDetails = {
      likes: 499,
    };

    const response = await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(newDetails);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...firstBlog, ...newDetails });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
