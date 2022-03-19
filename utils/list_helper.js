const dummy = () => {
  return 1;
};

const totalLikes = (list) => {
  if (!list || list.length === 0) return 0;

  return list.reduce((accum, current) => {
    return accum + current.likes;
  }, 0);
};

const favoriteBlog = (list) => {
  if (!list || list.length === 0) return null;
  const toSort = [...list];
  toSort.sort((a,b) => b.likes - a.likes);
  return toSort.shift();
};

const getMost = (countObj) => {
  const sortableCount = Object.entries(countObj);
  sortableCount.sort((a, b) => b[1] - a[1]);

  return sortableCount.shift();
};

const mostBlogs = (list) => {
  if (!list || list.length === 0) return null;
  const authorsCount = {};
  // count number of blogs each author has
  list.forEach(blog => {
    const authorInCount = blog.author in authorsCount;
    const count = authorInCount 
      ? authorsCount[blog.author] 
      : 0;
    authorsCount[blog.author] = count + 1;
  });

  // sort them in descenting order and select the top most author
  const authorWithMost = getMost(authorsCount);
  return {author: authorWithMost[0], blogs: authorWithMost[1]};
};

const mostLikes = (list) => {
  if (!list || list.length === 0) return null;
  const authorsCount = {};
  // sum the total likes each author has
  list.forEach((blog) => {
    const authorInCount = blog.author in authorsCount;
    const sum = authorInCount ? authorsCount[blog.author] : 0;
    authorsCount[blog.author] = sum + blog.likes;
  });

  // sort them in descenting order and select the top most author
  const authorWithMost = getMost(authorsCount);
  return { author: authorWithMost[0], likes: authorWithMost[1] };
};

module.exports =  {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};