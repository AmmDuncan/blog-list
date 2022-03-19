const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes helper', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      likes: 5
    },
    {
      _id: '5a422aa71b54a6762df3417f8',
      title: 'Web dev will grow humongous',
      likes: 8
    },
  ];

  it('returns zero for empty list', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  it('return the number of likes if only one blog is passed', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(blogs[0].likes);
  });

  it('return the right number for a bigger list', () => {
    const result = listHelper.totalLikes(blogs);
    const expectedTotal = blogs[0].likes + blogs[1].likes;
    expect(result).toBe(expectedTotal);
  });
});

describe('favoriteBlog', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      likes: 5
    },
    {
      _id: '5a422aa71b54a6762df3417f8',
      title: 'Web dev will grow humongous',
      likes: 8
    },
  ];

  it ('returns undefined if list is empty', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  }); 

  it ('returns the blog when the list contains only one blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]]);
    expect(result).toEqual(blogs[0]);
  });

  it ('returns the right blog when more  blogs are provided', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });
});

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('mostBlogs', () => {
  it('returns null when empty list if provided', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  it('returns that author when list on one item is provided', () => {
    const firstBlog = blogs[0];
    const result = listHelper.mostBlogs([firstBlog]);
    expect(result).toEqual({
      author: firstBlog.author,
      blogs: 1
    });
  });

  it('it returns right author when longer list is provided', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

});

describe('mostLikes', () => {
  it('returns null when empty list is provided', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  it('it returns the author when the list contains only one blog', () => {
    const firstBlog = blogs[0];
    const result = listHelper.mostLikes([firstBlog]);
    expect(result).toEqual({
      author: firstBlog.author,
      likes: firstBlog.likes
    });
  });

  it('returns the right author when longer list is provided', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});