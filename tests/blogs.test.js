const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');

const api = supertest(app);

describe('blog list endpoint', () => {
  jest.setTimeout(30000);
  const blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 2,
    },
  ];

  let userDetails = {
    username: 'test user',
    password: 'test123'
  };

  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // create user
    await api.post('/api/users').send(userDetails);

    // login and get token
    const response = await api
      .post('/login')
      .send(userDetails);
    token = response.body.data.token;

    const user = await User.findById(response.body.data.user.id);

    const addBlogs = blogs.map((blog) => {
      const toSave = new Blog({ ...blog });
      toSave.user = user._id;
      return toSave.save();
    });

    await Promise.all(addBlogs);
  });

  it('returns `id` field', async () => {
    const response = await api.get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body.data[0].id).toBeDefined();
  });

  it('adds new blog', async () => {
    const newBlog = {
      title: 'CSS box model',
      author: 'Ammiel Yawson',
      url: 'https://blog.ammielyawson.com',
      likes: 16,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog);
    expect(response.status).toBe(201);
    expect(response.body.data.title).toEqual(newBlog.title);
  });

  it('defaults to 0 if number of likes in not provided', async () => {
    const newBlogWithoutLikes = {
      title: 'CSS box model',
      author: 'Ammiel Yawson',
      url: 'https://blog.ammielyawson.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogWithoutLikes);

    expect(response.status).toBe(201);
    expect(response.body.data.likes).toBe(0);
  });

  it('responds with bad request if title and url are absent from request body', async () => {
    const newBlogWithoutTitleAndUrl = {
      author: 'Ammiel Yawson',
    };
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlogWithoutTitleAndUrl);
    expect(response.status).toBe(400);
  });

  it('deletes blog and responds with appropriate status code', async () => {
    const blog = await Blog.findOne({title: blogs[0].title});
    const id = blog.id.toString();
    
    const response = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${token}`);
    expect(response.status).toBe(200);
    
    const blogsInDb = await Blog.find({});
    expect(blogsInDb.length).toBe(blogs.length - 1);
  });

  it('updates blog', async () => {
    const [toUpdate] = await Blog.find({});
    toUpdate.likes = 59;
    const response = await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(toUpdate.toJSON());
    expect(response.status).toBe(200);
    expect(response.body.data.likes).toBe(59);
  });

  it('responds with appropriate status when creating a blog with an incorrect token', async () => {
    const newBlogWithoutLikes = {
      title: 'CSS box model',
      author: 'Ammiel Yawson',
      url: 'https://blog.ammielyawson.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer some-incorrect-token')
      .send(newBlogWithoutLikes);

    expect(response.status).toBe(401);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
