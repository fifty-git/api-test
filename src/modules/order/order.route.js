const express = require('express');
const router = express.Router();

const OrderController = require('./order.controller');

const orderController = new OrderController();

router.get('/', orderController.getAll.bind(orderController));
router.get('/:id', orderController.getById.bind(orderController));
router.post('/', orderController.create.bind(orderController));
router.put('/:id', orderController.update.bind(orderController));
router.delete('/:id', orderController.delete.bind(orderController));

module.exports = router;
