class NotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Запрашиваемый ресурс не найден';
  }
}

module.exports = NotFoundError;
