const { getData, saveData } = require('../util/dbUtil');

const retrieveItems = () => {
    const data = getData();
    return data.items;
}

const retriveItem = (id) => {
    const data = getData();
    const { items } = data;
    const item = items.find(item => item.id == id);
    if (!item) {
        return {error: 'item not found'};
    }
    return item;
}


module.exports = { retrieveItems, retriveItem };