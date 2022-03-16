const dummy = (blog) => {
  blog.length;
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes;
  };

  return blogs.length ? blogs.reduce(reducer, 0) : 0;
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return {};

  let favorite = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  delete favorite._id;
  delete favorite.url;
  delete favorite.__v;

  return favorite;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return {};

  const counter = {};
  blogs.forEach((blog) => {
    counter[blog.author] = (counter[blog.author] || 0) + 1;
  });

  const countArray = Object.entries(counter);
  const firstAuthor = countArray[0];
  let most = { author: firstAuthor[0], blogs: firstAuthor[1] };

  countArray.forEach(([key, value]) => {
    if (value > most.blogs) {
      most = { author: key, blogs: value };
    }
  });

  return most;
};

const mostLikes = (blogs) => {
  if (!blogs.length) return {};

  const counter = {};
  blogs.forEach((blog) => {
    counter[blog.author] = (counter[blog.author] || 0) + blog.likes;
  });

  const countArray = Object.entries(counter);
  const firstAuthor = countArray[0];
  let most = { author: firstAuthor[0], likes: firstAuthor[1] };

  countArray.forEach(([key, value]) => {
    if (value > most.blogs) {
      most = { author: key, likes: value };
    }
  });

  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
