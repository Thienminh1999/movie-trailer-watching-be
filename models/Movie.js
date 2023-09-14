const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

module.exports = class Movie {
  constructor(id, videos) {
    this.id = id;
    this.videos = videos;
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getMovieByKeyWord(keyword) {
    const movies = this.fetchAll();
    const filterMovies = movies.filter(
      (item) =>
        String(item.title)
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase()) ||
        String(item.overview)
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
    );
    return filterMovies;
  }

  static getMovieByGenre(genreId) {
    const movies = this.fetchAll();
    const moviesByGenre = movies.filter((item) =>
      item.genre_ids.includes(genreId)
    );
    return moviesByGenre;
  }

  static getMovieTopRate() {
    const movies = Movie.fetchAll();
    const sortedByVoteAverageList = movies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return sortedByVoteAverageList;
  }

  static getMovieTrending() {
    const movies = Movie.fetchAll();
    const sortedByPopularList = movies.sort(
      (a, b) => b.popularity - a.popularity
    );
    return sortedByPopularList;
  }
};
