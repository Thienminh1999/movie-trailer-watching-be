const express = require("express");
const movieController = require("../controllers/MovieController");
const router = express.Router();

router.get("/trending", movieController.getMovieTrending);
router.get("/top-rate", movieController.getMovieRating);
router.get("/discover/:genre", movieController.getMovieByGenre);
router.get("/video", movieController.getVideosOfMovie);
router.post("/search", movieController.postSearchMovieByKeyWord);
module.exports = router;
