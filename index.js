	
const serverless = require('serverless-http');
const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const { expressjwt: expJwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(
  expJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/auth'],
  }),
);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: err.message + 'test' });
      return;
    }
    next();
  });
  

// routes
const authRouter = require('./routes/auth')(jwt);
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const addressRouter = require('./routes/address');
const orderRouter = require('./routes/order');

app.use('/', userRouter)
    .use('/', itemRouter)
    .use('/', addressRouter)
    .use('/', orderRouter);
// const userController = require('./controller/userController');

// app.get('/', userController.all);
 

// auth - jwt
app.use(
    '/',
    basicAuth({
      users: { admin: process.env.BASIC_USER_PASS },
    }),
    authRouter,
);

module.exports.handler = serverless(app);
