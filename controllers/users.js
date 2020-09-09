const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  createObject,
  loginUser,
  getAllObject,
  getObjectById,
  objectIdValid,
  passwordRegexp,
} = require('../helpers/helpers');

function createUser(req, res) {
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
        createObject(User.create({
          name,
          about,
          avatar,
          password: hash,
          email,
        }), req, res, 'user');
      });
  } else {
    res.status(400).send({ message: 'Введите пароль длиной не менее 8 символов, состоящий из латинских букв, цифр и специальных символов' });
  }
}

function login(req, res) {
  const { email, password } = req.body;
  if (typeof email === 'string' && typeof password === 'string') {
    loginUser(User.findByCredentials(email, password), req, res);
  } else res.status(400).send({ message: 'Введите логин и пароль' });
}

function getAllUsers(req, res) {
  getAllObject(User.find({}), req, res);
}

function getSingleUser(req, res) {
  try {
    const userId = req.params.id;
    objectIdValid(userId);
    getObjectById(User.findById(userId), req, res);
  } catch (err) {
    res.status(404).send({ message: 'Такого пользователя не существует' });
  }
}

module.exports = {
  createUser,
  login,
  getAllUsers,
  getSingleUser,
};
