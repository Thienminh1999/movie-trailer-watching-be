const path = require("path");
const fs = require("fs");
const { filterVideo } = require("../utils/filterVideo");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

module.exports = class Video {
  constructor(id, videos) {
    this.id = id;
    this.videos = videos;
  }
  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getVideosByMovieId(movieId) {
    const videos = this.fetchAll();
    const result = videos.find((item) => item.id === movieId);
    if (result) {
      return result.videos;
    }
    return [];
  }

  static getVideoTrailerByMovieId(movieId) {
    // cần hỏi thêm về gọi hàm private
    const videos = this.getVideosByMovieId(movieId);
    const filteredVideos = filterVideo(videos);
    return filteredVideos;
  }
};
