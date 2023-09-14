const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);

module.exports = class Genre {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getGenreById(genreId) {
    const genres = this.fetchAll();
    const findGenre = genres.find((item) => item.id === genreId);
    return findGenre;
  }
};
