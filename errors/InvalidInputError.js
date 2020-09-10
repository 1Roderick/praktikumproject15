class InvalidInputError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Неправильные почта или пароль';
  }
}

module.exports = InvalidInputError;
