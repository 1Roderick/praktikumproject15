const mongoose = require('mongoose');
const User = require('../models/user');

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
