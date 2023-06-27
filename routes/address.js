const express = require('express');
const {protect} = require("../application/auth");
const logger = require('../logger/logger');

const router = express.Router();

router.get('/address', protect, (req, res) => {
  logger.info("Getting all addresses")
  res.send(`Getting all addresses!`);
});

router.get('/address/:id', protect, (req, res) => {
  logger.info(`Getting address ${req.params.id}`);
  res.send(`Getting address ${req.params.id}`);
});

module.exports = router;