const router = require('express').Router();
const itemController = require('./../controller/itemController');

const routes = (() => {
  router.get('/item/:id', itemController.get);
  // router.post('/item', userController.post);
  router.get('/items', itemController.all);
  // router.put('/user', userController.put);
  // router.delete('/user/:id', userController.delete);
  return router;
})();

module.exports = routes;
