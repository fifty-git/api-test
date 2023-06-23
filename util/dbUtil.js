const fs = require('fs');
const dbPath = '../data/db.json';


const getData = () => {
    const dbData = require(dbPath);
    return dbData;
}

const saveData = async (data) => {
    const stringifyData = JSON.stringify(data);
    return new Promise((res, rej) => {
        fs.writeFile('./data/db.json', stringifyData, (err) => {
            if (err) {
              rej(err);   
            }
            else {
              res('successfully saved.');
            }
        });
    });
}

module.exports = { getData, saveData };