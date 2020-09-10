const jwt = require('jsonwebtoken');
const { devKey } = require('../configs/config.js');

const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotAuthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, devKey);
  } catch (err) {
    next(new NotAuthorizedError());
  }
  req.user = payload;
  next();
};
