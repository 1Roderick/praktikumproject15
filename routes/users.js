const routerUsers = require('express').Router();
const { createUser, getAllUsers, getSingleUser } = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:id', getSingleUser);
routerUsers.post('/', createUser);

module.exports = routerUsers;
