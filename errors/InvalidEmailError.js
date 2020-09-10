class InvalidEmailError extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Этот адрес электронной почты уже используется';
  }
}

module.exports = InvalidEmailError;
