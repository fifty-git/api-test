const authRouter = require('express').Router();
const authController = require('../controller/authController');

const routes = jwt => {
  const controller = authController(jwt);
  authRouter.get('/auth', controller.get);
  return authRouter;
};

module.exports = routes;
