const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');

const userController = new UserController();

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.post('/', userController.create.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router;
