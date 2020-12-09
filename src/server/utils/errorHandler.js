function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.end('error', { error: err });
}

module.exports = errorHandler;
