class InvalidCardError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Ошибка в идентификаторе карточки';
  }
}

module.exports = InvalidCardError;
