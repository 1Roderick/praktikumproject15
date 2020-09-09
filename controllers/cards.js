const Card = require('../models/card');
const {
  createObject,
  getAllObject,
  getObjectById,
  existUser,
  objectIdValid,
} = require('../helpers/helpers');

function getAllCards(req, res) {
  getAllObject(Card.find({}), req, res);
}

function createCard(req, res) {
  try {
    const owner = req.user._id;
    objectIdValid(owner);
    const { name, link } = req.body;
    existUser(owner)
      .then((checkResult) => {
        if (checkResult) {
          createObject(Card.create({ name, link, owner }), req, res, 'card');
        } else {
          throw new Error();
        }
      })
      .catch(() => res.status(404).send({ message: 'Такого пользователя не cуществует' }));
  } catch (err) {
    res.status(400).send({ message: 'Ошибка в идентификаторе карточки' });
  }
}

function deleteCard(req, res) {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;
    objectIdValid(userId);
    objectIdValid(cardId);
    existUser(userId)
      .then((checkResult) => {
        if (checkResult) {
          getObjectById(Card.findByIdAndRemove({ _id: cardId }), req, res, userId);
        } else {
          throw new Error();
        }
      })
      .catch(() => res.status(404).send({ message: 'Карточка не существует' }));
  } catch (err) {
    res.status(404).send({ message: 'Карточка не существует' });
  }
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
