class NotDeleteCardError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'Нельзя удалить чужую карточку';
  }
}

module.exports = NotDeleteCardError;
