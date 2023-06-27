require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const logger = require('./logger/logger');
const authRoute = require('./routes/auth');
const addressRoute = require('./routes/address');
const userRoute = require('./routes/user');
const { protect } = require('./application/auth');
const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', protect, (req, res) => {
  res.send(`Hello World!`);
});

app.use(express.json());
app.use(authRoute);
app.use(addressRoute);
app.use(userRoute);

app.listen(port, () => {
  logger.info(`API running on http://localhost:${port}`);
});

module.exports.handler = serverless(app);
