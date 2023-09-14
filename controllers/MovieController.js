const Genre = require("../models/Genre");
const Movie = require("../models/Movie");
const Video = require("../models/Video");
const { filterMovie } = require("../utils/filterVideo");
const { getTotalPage, getMoviesByPage } = require("../utils/paging");

exports.getMovieTrending = (req, res, next) => {
  const pageParam = req.query.page || 1;
  const moviesTreding = Movie.getMovieTrending();
  const response = {
    results: getMoviesByPage(moviesTreding, pageParam),
    page: pageParam,
    total_pages: getTotalPage(moviesTreding),
  };
  res.status(200).send(response);
};

exports.getMovieRating = (req, res, next) => {
  const pageParam = req.query.page || 1;
  const movieTopRate = Movie.getMovieTopRate();
  const response = {
    results: getMoviesByPage(movieTopRate, pageParam),
    page: pageParam,
    total_pages: getTotalPage(movieTopRate),
  };
  res.status(200).send(response);
};

exports.getMovieByGenre = (req, res, next) => {
  const pageParam = req.query.page || 1;
  const genreId = Number(req.params.genre);

  if (!genreId) {
    return res.status(400).send({ message: "Not found genre parram" });
  }
  const genreObj = Genre.getGenreById(genreId);
  if (!genreObj) {
    return res.status(400).send({ message: "Not found that genre id" });
  }

  const moviesByGenre = Movie.getMovieByGenre(genreId);
  const response = {
    results: getMoviesByPage(moviesByGenre, pageParam),
    page: pageParam,
    total_pages: getTotalPage(moviesByGenre),
    genre_name: genreObj.name,
  };
  res.status(200).send(response);
};

exports.getVideosOfMovie = (req, res, next) => {
  const movieId = Number(req.body.film_id);
  if (!movieId) {
    return res.status(400).send({ message: "Not found film_id param" });
  }
  const trailersOfMovie = Video.getVideoTrailerByMovieId(movieId);
  if (trailersOfMovie.length === 0) {
    return res.status(404).send({ message: "Not found video" });
  }
  res.status(200).send(trailersOfMovie[0]);
};

exports.postSearchMovieByKeyWord = (req, res, next) => {
  const pageParam = req.query.page || 1;
  const filterObj = {
    keyword: req.body.keyword,
    genreId: Number(req.body.genreId),
    mediaType: req.body.mediaType,
    language: req.body.language,
    year: Number(req.body.year),
  };
  if (!filterObj.keyword) {
    return res.status(400).send({ message: "Not found keyword parram" });
  }
  const resultByKeyWord = Movie.getMovieByKeyWord(filterObj.keyword);
  const resultByFilter = filterMovie(resultByKeyWord, filterObj);
  const response = {
    results: getMoviesByPage(resultByFilter, pageParam),
    page: pageParam,
    total_pages: getTotalPage(resultByFilter),
  };
  res.status(200).send(response);
};
