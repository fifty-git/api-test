
const { retriveOrders, retrieveOrder, saveOrder, updateOrder, deleteOrder } = require('../model/orderModel');

const getOrder = async (id) => {
    return retrieveOrder(id);

};

const getOrders = () => {
    return retriveOrders();
}

const insertOrder = async (data) => {
    return await saveOrder(data);
}

const editOrder = async (data) => {
    return await updateOrder(data);
}

const removeOrder = async (id) => {
    return await deleteOrder(id);
}

module.exports = {
    getOrder,
    getOrders,
    insertOrder,
    editOrder,
    removeOrder
};