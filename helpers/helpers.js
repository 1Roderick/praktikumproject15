const mongoose = require('mongoose');
const validator = require('validator/lib/isURL');
const User = require('../models/user');

const UserNotFoundError = require('../errors/UserNotFoundError');
const BadLinkError = require('../errors/BadLinkError');

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

function urlValidator(link) {
  if (!validator(link)) {
    throw new BadLinkError();
  } else return link;
}

module.exports = {
  getAllObject,
  getObjectById,
  existUser,
  objectIdValid,
  urlValidator,
};
