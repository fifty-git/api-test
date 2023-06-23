const { getData, saveData } = require('../util/dbUtil');

const mapOrder = (order) => {
    const data = getData();
    const { addresses, orderStatuses, users, items } = data;
    order.shippingAddress = addresses.find(address => address.id == order.shippingAddress);
    order.billingAddress = addresses.find(address => address.id == order.billingAddress);
    const orderStatus =  orderStatuses.find(status => status.id == order.orderStatusId);
    order.orderStatus = orderStatus.description;
    order.items = order.itemIds.map(id => {
        const itemResult = items.find(item => item.id == id);
        return itemResult.description;
    });
    const userResult = users.find(user => user.id == order.userId);
    order.user = `${userResult.firstName} ${userResult.lastName}`;
    return order;
}
const retriveOrders = () => {
    const data = getData();
    return data.orders.map (mapOrder);
}

const retrieveOrder = (id) => {
    const data = getData();
    const { orders } = data;
    const order = orders.find(order => order.id == id);
    if (!order) {
        return {error: 'order not found'};
    }
    return mapOrder(order);
}

const saveOrder = async (body) => {
    try {
        const data = getData();
        const index = data.orders.findIndex(order => body.id == order.id);
        if (index > -1) {
            return { error: "Order id already exists." };
        }
        const statusIndex = data.orderStatuses.find(status => body.orderStatusId == status.id);
        if (statusIndex < 0) {
            return { error: "status id not found." };
        }
        const userIndex = data.users.find(user => body.userId == user.id);
        if (userIndex < 0) {
            return { error: "user id not found." };
        }
        data.orders.push(body);
        await saveData(data);
        return { success: true, message: "order added" };
    } catch (error) {
        return { error };
    }
}

const updateOrder = async (body) => {
    try {
        const data = getData();
        const statusIndex = data.orderStatuses.find(status => body.orderStatusId == status.id);
        if (statusIndex < 0) {
            return { error: "status id not found." };
        }
        const userIndex = data.users.find(user => body.userId == user.id);
        if (userIndex < 0) {
            return { error: "user id not found." };
        }
        const index = data.orders.findIndex(order => body.id == order.id);
        if (index > -1) {
            data.orders[index] = body;
        } else {
            return { error: "record not found!" };
        }
        
        await saveData(data);
        return { success: true, message: "order updated" };
    } catch (error) {
        return { error };
    }
}


const deleteOrder = async (id) => {
    try {
        const data = getData();
        const index = data.orders.findIndex(order => id == order.id);
        if (index > -1) {
            data.orders.splice(index, 1);
            await saveData(data);
            return { success: true, message: "order deleted" };
        } else {
            return { error: "No record found" };
        }
    } catch (error) {
        return { error };
    }
}

module.exports = { retrieveOrder, retriveOrders, saveOrder, updateOrder, deleteOrder };