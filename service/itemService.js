
const { retrieveItems, retriveItem } = require('../model/itemModel');

const getItem = async (id) => {
    return retriveItem(id);

};

const getAllItems = () => {
    return retrieveItems();
}


module.exports = {
    getItem,
    getAllItems
};