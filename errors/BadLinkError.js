class BadLinkError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Формат ссылки неверный';
  }
}

module.exports = BadLinkError;
