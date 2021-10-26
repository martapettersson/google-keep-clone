const jwt = require("jsonwebtoken");

const secretToken = process.env.SECRET_TOKEN;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

exports.generateToken = (userId) =>
  jwt.sign({ id: userId }, secretToken, { expiresIn: tokenExpiration });
