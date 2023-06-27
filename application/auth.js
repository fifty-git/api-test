const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.protect = function (req, res, next) {
  logger.info('Validating token');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.decodedToken = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Token validation error' });
    }
  }
};
