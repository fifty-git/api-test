const express = require('express');
const { protect } = require('../application/auth');
const functions = require('../application/functions');
const logger = require('../logger/logger');

const router = express.Router();

router.get('/users', protect, (req, res) => {
  const list_users = functions.readJSON('users');
  if (list_users == null) {
    return res.status(500).json({ error: 'Failed to open db.json file!' });
  } else {
    res.json(list_users);
  }
});

router.get('/user/:id', protect, (req, res) => {
  logger.info(`[Id User Request] ${req.params.id} `);
  const list_users = functions.readJSON('users');
  for (const user of list_users) {
    if (req.params.id == user.id) {
      return res.json(user);
    }
  }
  return res.status(500).json({ error: `User ID ${req.params.id} not found!` });
});

router.post('/user', protect, (req, res) => {
  const { firstName, lastName, userTypeId } = req.body;
  if (!firstName || typeof firstName != 'string') {
    return res.status(500).json({ error: 'The firstName is required!' });
  }

  if (!lastName || typeof lastName != 'string') {
    return res.status(500).json({ error: 'The lastName is required!' });
  }

  if (!userTypeId || typeof userTypeId != 'number' ) {
    return res.status(500).json({ error: 'The userTypeId is required!' });
  } else {
    const list_usersTypes = functions.readJSON('userTypes');
    let bandId = false;
    for (const userType of list_usersTypes) {
      if (userTypeId == userType.id) {
        bandId = true;
      }
    }
    if (!bandId) {
      return res.status(500).json({ error: 'The userTypeId not found in userTypes!' });
    }
  }

  const id = functions.getLastId('users');
  const bandInserted = functions.insertUser('users', id, firstName, lastName, userTypeId);
  if (bandInserted) {
    return res.json({ msg: `The user ${firstName} ${lastName} was created with ID ${id}!` });
  } else {
    return res.status(500).json({ error: 'The user not was created!' });
  }
});

module.exports = router;
