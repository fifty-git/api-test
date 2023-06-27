const express = require('express');
const { protect } = require('../application/auth');
const functions = require('../application/functions');
const logger = require('../logger/logger');

const router = express.Router();

router.get('/addresses', protect, (req, res) => {
  const list_addresses = functions.readEntity('addresses');
  if (list_addresses == null) {
    return res.status(500).json({ error: 'Failed to read addresses in JSON File!' });
  } else {
    res.json(list_addresses);
  }
});

router.get('/address/:id', protect, (req, res) => {
  logger.info(`[Id Address Request] ${req.params.id} `);
  const list_addresses = functions.readEntity('addresses');
  for (const address of list_addresses) {
    if (req.params.id == address.id) {
      return res.json(address);
    }
  }
  return res.status(500).json({ error: `Address Id ${req.params.id} not found!` });
});

module.exports = router;
