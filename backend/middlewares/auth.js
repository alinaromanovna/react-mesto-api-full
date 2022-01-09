const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(new UnauthorizedError('Некорректный токен jwt'));
  }
  req.user = payload;
  next();
};
