const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { devKey } = require('../configs/config.js');

const { NODE_ENV, JWT_SECRET } = process.env;

function createObject(promise, req, res, type) {
  promise
    .then((respObj) => {
      if (type === 'user') {
        const {
          name,
          about,
          avatar,
          email,
          _id,
        } = respObj;
        res.send({
          name,
          about,
          avatar,
          email,
          _id,
        });
      } else {
        res.send(respObj);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.code === 11000) {
        res.status(409).send({ message: 'Этот адрес электронной почты уже используется' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function loginUser(promise, req, res) {
  promise
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
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    });
}

function getAllObject(promise, req, res) {
  promise
    .then((respObj) => res.status(200).send({ data: respObj }))
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function getObjectById(promise, req, res, userId) {
  promise
    .orFail(new Error('NotValidId'))
    .then((respObj) => {
      if (respObj.owner.equals(userId)) {
        res.status(200).send({ data: respObj });
      } else {
        res.status(403).send({ message: 'Нельзя удалить чужую карточку' });
      }
    })

    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Такого пользователя не существует' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}

function existUser(id) {
  return User.exists({ _id: id });
}

function objectIdValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error();
    throw error;
  }
}

const passwordRegexp = /[\u0023-\u0126]+/;

module.exports = {
  createObject,
  loginUser,
  getAllObject,
  getObjectById,
  existUser,
  objectIdValid,
  passwordRegexp,
};
