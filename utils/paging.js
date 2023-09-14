const PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const getTotalPage = (movies) => {
  return Math.ceil(movies.length / PAGE_SIZE);
};

const getMoviesByPage = (movies, page = DEFAULT_PAGE) => {
  const result = movies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  return result;
};

module.exports = {
  getTotalPage,
  getMoviesByPage,
};
