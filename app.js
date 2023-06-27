require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const logger = require('./logger/logger');

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.send(`Hello World!`);
});

app.listen(port, () => {
  logger.info(`API running on http://localhost:${port}`);
});

module.exports.handler = serverless(app);
