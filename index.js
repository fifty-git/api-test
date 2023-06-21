const express = require('express');
const serverless = require('serverless-http');
const routes = require('./src/routes');

const app = express();

// middlewares
app.use(express.json());

// routes
routes(app);

module.exports.handler = serverless(app);
