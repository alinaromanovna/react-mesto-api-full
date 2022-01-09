module.exports.serverError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        // eslint-disable-next-line comma-dangle
        : message,
    });
  next();
};
