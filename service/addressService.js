
const { retreiveAddresses, retrieveAddress, saveAddress, updateAddress, removeAddress } = require('../model/addressModel');

const getAddress = async (id) => {
    return retrieveAddress(id);

};

const getAllAddress = () => {
    return retreiveAddresses();
}

const insertAddress = async (data) => {
    return await saveAddress(data);
}

const editAddress = async (data) => {
    return await updateAddress(data);
}

const deleteAddress = async (id) => {
    return await removeAddress(id);
}
module.exports = {
    getAddress,
    getAllAddress,
    insertAddress,
    editAddress,
    deleteAddress
};