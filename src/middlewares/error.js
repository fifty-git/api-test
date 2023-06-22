const { AppError } = require('../cores/errors');

const ErrorMiddleware = {
  serverError: (err, req, res, next) => {
    if (err instanceof AppError) {
      return res.status(err.status).json({
        error: err.message,
      });
    }

    return res.status(500).json({
      error: 'Server error',
    });
  },
};

module.exports = ErrorMiddleware;
