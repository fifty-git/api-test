const db_file = './data/db.json';
const fs = require('fs');
const logger = require('../logger/logger');

const readEntity = function (key) {
  const dbOject = loadDBJson();
  if (dbOject != null) {
    try {
      if (key in dbOject) {
        return dbOject[key];
      } else {
        logger.info(`Entity ${key} not found!`);
        return null;
      }
    } catch (err) {
      logger.error('Error reading entity:', err);
      return null;
    }
  }
  return dbOject;
};

const getLastId = function (key) {
  const dbOject = loadDBJson();
  if (dbOject != null) {
    let id = 0;
    try {
      if (key in dbOject) {
        for (const data of dbOject[key]) {
          id = data.id;
        }
        return id + 1;
      } else {
        logger.info(`Entity ${key} not found!`);
        return null;
      }
    } catch (err) {
      logger.error('Error getting the last id:', err);
      return null;
    }
  }
  return dbOject;
};

const createUser = function (key, id, firstName, lastName, userTypeId) {
  const newUser = { id, firstName, lastName, userTypeId };
  const dbOject = loadDBJson();
  if (dbOject != null) {
    try {
      if (key in dbOject) {
        dbOject[key].push(newUser);
        fs.writeFileSync(db_file, JSON.stringify(dbOject, null, 2));
        return true;
      } else {
        logger.info(`Entity ${key} not found!`);
        return false;
      }
    } catch (err) {
      logger.error('Error creating user:', err);
      return false;
    }
  }
  return false;
};

const validateId = function (key, id) {
  const list_data = readEntity(key);
  for (const ldata of list_data) {
    if (id == ldata.id) {
      return true;
    }
  }
  return false;
};

const loadDBJson = function () {
  let data = fs.readFileSync(db_file);
  try {
    const data_parser = JSON.parse(data);
    return data_parser;
  } catch (err) {
    logger.error('Error parsing data:', err);
    return null;
  }
};

module.exports = { readEntity, getLastId, createUser, validateId, loadDBJson };
