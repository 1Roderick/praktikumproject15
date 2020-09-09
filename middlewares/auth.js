const jwt = require('jsonwebtoken');
const { devKey } = require('../configs/config.js');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, devKey);
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
