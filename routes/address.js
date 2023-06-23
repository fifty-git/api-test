const router = require('express').Router();
const addressController = require('./../controller/addressController');

const routes = (() => {
  router.get('/address/:id', addressController.get);
  router.post('/address', addressController.post);
  router.get('/addresses', addressController.all);
  router.put('/address', addressController.put);
  router.delete('/address/:id', addressController.delete);
  return router;
})();

module.exports = routes;
