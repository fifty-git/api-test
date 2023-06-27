const express = require('express');
const { protect } = require('../application/auth');
const functions = require('../application/functions');
const fs = require('fs');
const db_file = './data/db.json';
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

  if (!userTypeId || typeof userTypeId != 'number') {
    return res.status(500).json({ error: 'The userTypeId is required!' });
  } else {
    let bandId = functions.validateId('userTypes', userTypeId);
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

router.put('/user/:id', protect, (req, res) => {
  const { firstName, lastName, userTypeId, ...any } = req.body;
  let edited = null;
  const dbOject = functions.loadDB();
  if (dbOject == null) {
    return res.status(500).json({ error: 'Failed to open db.json file!' });
  }

  if (firstName) {
    if (typeof firstName != 'string') {
      return res.status(500).json({ error: "The firstName isn't string value!" });
    }
    edited = dbOject.users.find((user) => user.id == req.params.id);
    if (edited) {
      edited.firstName = firstName;
    }
  }

  if (lastName) {
    if (typeof lastName != 'string') {
      return res.status(500).json({ error: "The lastName isn't string value!" });
    }
    edited = dbOject.users.find((user) => user.id == req.params.id);
    if (edited) {
      edited.lastName = lastName;
    }
  }

  if (userTypeId) {
    if (typeof userTypeId != 'number') {
      return res.status(500).json({ error: "The userTypeId isn't number value!" });
    }
    let bandId = functions.validateId('userTypes', userTypeId);
    if (!bandId) {
      return res.status(500).json({ error: 'The userTypeId not found in userTypes!' });
    }
    edited = dbOject.users.find((user) => user.id == req.params.id);
    if (edited) {
      edited.userTypeId = userTypeId;
    }
  }

  if (Object.keys(any).length > 0) {
    return res.status(500).json({ error: `The specified field ${JSON.stringify(any)} not exist!.` });
  } else {
    if (edited == null) {
      return res.status(500).json({ error: `The specified user not exist!.` });
    }
    fs.writeFileSync(db_file, JSON.stringify(dbOject, null, 2));
    return res.json({ msg: `The user was updated!` });
  }
});

router.delete('/user/:id', protect, (req, res) => {
  logger.info(`[Id User Request] ${req.params.id} `);
  const dbOject = functions.loadDB();
  let index = dbOject.users.findIndex((user) => user.id == req.params.id);
  if (index != -1) {
    dbOject.users.splice(index, 1);
    fs.writeFileSync(db_file, JSON.stringify(dbOject, null, 2));
    return res.json({ msg: `The user with ID ${req.params.id} was deleted!` });
  } else {
    return res.status(500).json({ error: `User ID ${req.params.id} not found!` });
  }
});

module.exports = router;
