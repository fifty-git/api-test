
const { retriveUsers, retriveUser, insertUser, updateUser, deleteUser } = require('../model/userModel');

const getUser = async (id) => {
    return retriveUser(id);

};

const getAllUser = () => {
    return retriveUsers();
}

const saveUser = async (data) => {
    return await insertUser(data);
}

const editUser = async (data) => {
    return await updateUser(data);
}

const removeUser = async (id) => {
    return await deleteUser(id);
}

module.exports = {
    getUser,
    getAllUser,
    saveUser,
    editUser,
    removeUser,
};