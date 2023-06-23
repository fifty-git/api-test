const router = require('express').Router();
const userController = require('./../controller/userController');

const routes = (() => {
  router.get('/user/:id', userController.get);
  router.post('/user', userController.post);
  router.get('/users', userController.all);
  router.put('/user', userController.put);
  router.delete('/user/:id', userController.delete);
  return router;
})();

module.exports = routes;
