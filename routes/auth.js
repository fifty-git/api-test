const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

router.post('/login', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const encodedCredentials = authHeader.replace('Basic ', '');
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  const [username, password] = decodedCredentials.split(':');
  logger.info(`[username]: ${username}`);
  logger.info(`[password]: ${password}`);
  if (username == process.env.USER && password == process.env.PASS) {
    const expiresIn = '1h'; // Expiration time for the token
    const token = jwt.sign({ username }, secretKey, { expiresIn });

    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Password incorrect!' });
  }
});

module.exports = router;
