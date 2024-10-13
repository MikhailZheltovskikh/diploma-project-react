const User = require('../modules/User');
const ROLES = require('../constants/roles');

function getUsers() {
    return User.find();
}

function getRoles() {
    try {
        return [
            { id: ROLES.ADMIN, name: 'Admin' },
            { id: ROLES.MODERATOR, name: 'Moderator' },
            { id: ROLES.USER, name: 'User' },
        ];
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
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
