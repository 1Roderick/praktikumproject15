class BadPasswordError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Введите пароль длиной не менее 8 символов, состоящий из латинских букв, цифр и специальных символов';
  }
}

module.exports = BadPasswordError;
