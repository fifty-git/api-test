const express = require('express');
const serverless = require('serverless-http');
const routes = require('./src/routes');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
routes(app);

module.exports.handler = serverless(app);
