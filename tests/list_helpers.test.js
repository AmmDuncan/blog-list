const list_helpers = require('../utils/list_helpers');
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = list_helpers;

test('dummy returns one', () => {
  const blog = [];

  const result = dummy(blog);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ];
    expect(totalLikes(listWithOneBlog)).toBe(7);
  });

  test('of a bigger list is right', () => {
    const listWithMoreBlogs = [
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
    ];

    expect(totalLikes(listWithMoreBlogs)).toBe(24);
  });
});

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
  ];
  const listWithMoreBlogs = [
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
  ];

  test('returns empty object when list is empty', () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test('when list contains only one blog is that blog', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('when list contains multiple blogs is right', () => {
    expect(favoriteBlog(listWithMoreBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('most blogs', () => {
  test('of empty array returns empty object', () => {
    expect(mostBlogs([])).toEqual({});
  });

  test('of multiple blog returns right author', () => {
    const list = [
      { author: 'Ammiel' },
      { author: 'Ammiel' },
      { author: 'Samuel' },
      { author: 'Jack' },
      { author: 'Jack' },
      { author: 'Jack' },
    ];

    expect(mostBlogs(list)).toEqual({
      author: 'Jack',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('of empty list is an empty object', () => {
    expect(mostLikes([])).toEqual({});
  });

  test('of multiple blog returns right author', () => {
    const list = [
      { author: 'Ammiel', likes: 5 },
      { author: 'Ammiel', likes: 7 },
      { author: 'Samuel', likes: 11 },
      { author: 'Jack', likes: 2 },
      { author: 'Jack', likes: 4 },
      { author: 'Jack', likes: 3 },
    ];

    expect(mostLikes(list)).toEqual({
      author: 'Ammiel',
      likes: 12,
    });
  });
});
