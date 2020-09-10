const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserNotFoundError = require('../errors/UserNotFoundError');
const NotCorrectInputError = require('../errors/NotCorrectInputError');
const InvalidEmailError = require('../errors/InvalidEmailError');
const BadPasswordError = require('../errors/BadPasswordError');
const InvalidInputError = require('../errors/InvalidInputError');

const { devKey } = require('../configs/config.js');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  getAllObject,
  getObjectById,
  objectIdValid,
} = require('../helpers/helpers');

function createUser(req, res, next) {
  const passwordRegexp = /[\u0023-\u0126]+/;
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;
  if (password && password.match(passwordRegexp)) {
    bcrypt.hash(password, 10)
      .then((hash) => {
        User.create({
          name,
          about,
          avatar,
          password: hash,
          email,
        })
          .then((respObj) => {
            res.send({
              name: respObj.name,
              about: respObj.about,
              avatar: respObj.avatar,
              email: respObj.email,
              _id: respObj._id,
            });
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
              next(new NotCorrectInputError());
            } else if (err.code === 11000) {
              next(new InvalidEmailError());
            }
          });
      });
  } else {
    next(new BadPasswordError());
  }
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (typeof email === 'string' && typeof password === 'string') {
    User.findByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : devKey,
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
          .end();
      })
      .catch(() => {
        next(new InvalidInputError());
      });
  }
}

function getAllUsers(req, res) {
  getAllObject(User.find({}), req, res);
}

function getSingleUser(req, res, next) {
  try {
    const userId = req.params.id;
    objectIdValid(userId);
    getObjectById(User.findById(userId), req, res, next);
  } catch (err) {
    next(new UserNotFoundError());
  }
}

module.exports = {
  createUser,
  login,
  getAllUsers,
  getSingleUser,
};
