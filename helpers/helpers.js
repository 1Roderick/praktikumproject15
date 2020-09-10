const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { devKey } = require('../configs/config.js');

const { NODE_ENV, JWT_SECRET } = process.env;

const UserNotFoundError = require('../errors/UserNotFoundError');

function getAllObject(promise, req, res, next) {
  promise
    .then((respObj) => res.status(200).send({ data: respObj }))
    .catch(next);
}

function getObjectById(promise, req, res, next) {
  promise
    .then((respObj) => {
      res.status(200).send({ data: respObj });
    })
    .catch(() => {
      next(new UserNotFoundError());
    });
}

function existUser(id) {
  return User.exists({ _id: id });
}

function objectIdValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error();
  }
}

module.exports = {
  getAllObject,
  getObjectById,
  existUser,
  objectIdValid,
};
