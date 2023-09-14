const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "userToken.json"
);

module.exports = class UserToken {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
  }
  static fecthAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getUserByToken(token) {
    const userTokens = this.fecthAll();
    const result = userTokens.find((item) => item.token === token);
    return result;
  }
};
