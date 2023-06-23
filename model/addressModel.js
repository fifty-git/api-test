const { getData, saveData } = require('../util/dbUtil');

const retreiveAddresses = () => {
    const data = getData();
    return data.addresses;
}

const retrieveAddress = (id) => {
    const data = getData();
    const { addresses } = data;
    const address = addresses.find(address => address.id == id);
    if (!address) {
        return {error: 'address not found'};
    }
    return address;
}

const saveAddress = async (body) => {
    try {
        const data = getData();
        const index = data.addresses.findIndex(address => body.id == address.id);
        if (index > -1) {
            return { error: "Address id already exists." };
        }

        data.addresses.push(body);
        await saveData(data);
        return { success: true, message: "address added" };
    } catch (error) {
        return { error };
    }
}

const updateAddress = async (body) => {
    try {
        const data = getData();
        const index = data.addresses.findIndex(address => body.id == address.id);
        if (index > -1) {
            data.addresses[index] = body;
        } else {
            return { error: "record not found." };
        }

        await saveData(data);
        return { success: true, message: "address updated" };
    } catch (error) {
        return { error };
    }
}

const removeAddress = async (id) => {
    try {
        const data = getData();
        const index = data.addresses.findIndex(address => id == address.id);
        if (index > -1) {
            data.addresses.splice(index, 1);
            await saveData(data);
            return { success: true, message: "address deleted" };
        } else {
            return { error: "No record found" };
        }
    } catch (error) {
        return { error };
    }
}

module.exports = { retreiveAddresses, retrieveAddress, saveAddress, updateAddress, removeAddress };