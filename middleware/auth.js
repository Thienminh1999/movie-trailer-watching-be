const UserToken = require("../models/UserToken");

exports.authentication = (req, res, next) => {
  const tokenFromUser = req.headers["x-access-token"];
  if (tokenFromUser) {
    const userToken = UserToken.getUserByToken(tokenFromUser);
    if (userToken) {
      next();
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

exports.wrongEndpointHandle = (req, res, next) => {
  return res.status(404).send({ message: "Route not found" });
};
