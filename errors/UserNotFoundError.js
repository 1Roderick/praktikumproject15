class UserNotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Такого пользователя не существует';
  }
}

module.exports = UserNotFoundError;
