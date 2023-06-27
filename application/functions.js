const db_file = './data/db.json';
const fs = require('fs');
const logger = require('../logger/logger');
module.exports.readJSON = function (key) {
  let rawdata = fs.readFileSync(db_file);
  try {
    const dict_data = JSON.parse(rawdata);
    if (key in dict_data) {
      return dict_data[key];
    } else {
      logger.info(`Key ${key} not found!`);
      return null;
    }
  } catch (err) {
    logger.error('Error parsing JSON string:', err);
    return null;
  }
};

module.exports.getLastId = function (key) {
  let rawdata = fs.readFileSync(db_file);
  let id = 0;
  try {
    const dict_data = JSON.parse(rawdata);
    if (key in dict_data) {
      for (const data of dict_data[key]) {
        id = data.id;
      }
      return id + 1;
    } else {
      logger.info(`Key ${key} not found!`);
      return null;
    }
  } catch (err) {
    logger.error('Error parsing JSON string:', err);
    return null;
  }
};

module.exports.insertUser = function (key, id, firstName, lastName, userTypeId) {
  const newUser = { id, firstName, lastName, userTypeId };
  let rawdata = fs.readFileSync(db_file);
  try {
    const dict_data = JSON.parse(rawdata);
    if (key in dict_data) {
      dict_data[key].push(newUser);
      fs.writeFileSync(db_file, JSON.stringify(dict_data, null, 2));
      return true;
    } else {
      logger.info(`Key ${key} not found!`);
      return false;
    }
  } catch (err) {
    logger.error('Error inserting JSON:', err);
    return false;
  }
};
