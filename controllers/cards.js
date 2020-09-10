const mongoose = require('mongoose');
const Card = require('../models/card');

const CardNotFoundError = require('../errors/CardNotFoundError');
const NotDeleteCardError = require('../errors/NotDeleteCardError');
const NotCorrectInputError = require('../errors/NotCorrectInputError');

const {
  getAllObject,
  objectIdValid,
} = require('../helpers/helpers');

function getAllCards(req, res, next) {
  getAllObject(Card.find({}), req, res, next);
}

function createCard(req, res, next) {
  try {
    const owner = req.user._id;
    objectIdValid(owner);
    const { name, link } = req.body;
    Card.create({ name, link, owner })
      .then((respObj) => res.send(respObj))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new NotCorrectInputError());
        }
      });
  } catch (err) {
    next(err);
  }
}

function deleteCard(req, res, next) {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;
    objectIdValid(cardId);
    Card.findById(cardId)
      .orFail(new CardNotFoundError())
      .then((respObj) => {
        if (respObj.owner.equals(userId)) {
          respObj.deleteOne()
            .then((deletedObj) => res.send(deletedObj));
        } else {
          next(new NotDeleteCardError());
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
