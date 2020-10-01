class NotAuthorizedError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Необходима авторизация';
  }
}

module.exports = NotAuthorizedError;
