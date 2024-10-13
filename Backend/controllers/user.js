const User = require('../modules/User');
const ROLES = require('../constants/roles');

function getUsers() {
    try {
        return User.find();
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

function getRoles() {
    return [
        { id: ROLES.ADMIN, name: 'Admin' },
        { id: ROLES.MODERATOR, name: 'Moderator' },
        { id: ROLES.USER, name: 'User' },
    ];
}

// delete

function deleteUser(id) {
    try {
        return User.deleteOne({ _id: id });
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// edit(roles)

function updateUser(id, userData) {
    try {
        return User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

module.exports = {
    getUsers,
    getRoles,
    deleteUser,
    updateUser,
};
