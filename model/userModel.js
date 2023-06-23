const { getData, saveData } = require('../util/dbUtil');

const mapUser = (user) => {
    const data = getData();
    const { userTypes } = data;
    const userType = userTypes.find(userType => userType.id == user.userTypeId);
    user.userType = userType.description;
    return user;
}
const retriveUsers = () => {
    const data = getData();
    return data.users.map(mapUser);
}

const retriveUser = (id) => {
    const data = getData();
    const { users } = data;
    const { userTypes } = data;
    const user = users.find(user => user.id == id);
    if (!user) {
        return {error: 'user not found'};
    }
    return mapUser(user);
}

const insertUser = async (body) => {
    try {
        const data = getData();
        const index = data.users.findIndex(user => body.id == user.id);
        if (index > -1) {
            return { error: "User id already exists." };
        }
        data.users.push(body);
        await saveData(data);
        return { success: true, message: "user added" };
    } catch (error) {
        return { error };
    }
    
}

const updateUser = async (body) => {
    try {
        const data = getData();
        const index = data.users.findIndex(user => body.id == user.id);
        if (index > -1) {
            data.users[index] = body;
        } else {
            return { error: "record not found!" };
        }
        
        await saveData(data);
        return { success: true, message: "user added" };
    } catch (error) {
        return { error };
    }
    
}

const deleteUser = async (id) => {
    try {
        const data = getData();
        const index = data.users.findIndex(user => id == user.id);
        if (index > -1) {
            data.users.splice(index, 1);
            await saveData(data);
            return { success: true, message: "user deleted" };
        } else {
            return { error: "No record found" };
        }
    } catch (error) {
        return { error };
    }
}

module.exports = { retriveUsers, retriveUser, insertUser, updateUser, deleteUser };