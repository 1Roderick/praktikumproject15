class CardNotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Карточка не существует';
  }
}

module.exports = CardNotFoundError;
