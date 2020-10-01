const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getAllUsers, getSingleUser } = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex(),
  }),
}), getSingleUser);

module.exports = routerUsers;
