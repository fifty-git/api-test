const router = require('express').Router();
const orderController = require('./../controller/orderController');

const routes = (() => {
  router.get('/order/:id', orderController.get);
  router.post('/order', orderController.post);
  router.get('/orders', orderController.all);
  router.put('/order', orderController.put);
  router.delete('/order/:id', orderController.delete);
  return router;
})();

module.exports = routes;
