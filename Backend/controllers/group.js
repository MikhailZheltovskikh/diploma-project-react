const Group = require('../modules/Group');

// add
async function addGroup(group) {
    try {
        return Group.create(group);
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// edit
async function editGroup(id, group) {
    try {
        const newGroup = await Group.findByIdAndUpdate(id, group, { new: true });

        return newGroup;
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// delete
function deleteGroup(id) {
    try {
        return Group.deleteOne({ _id: id });
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// get list
function getGroups() {
    try {
        return Group.find();
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

// get item
function getGroup(id) {
    try {
        return Group.findById(id);
    } catch (error) {
        throw new Error(error.message || 'Неизвестная ошибка...');
    }
}

module.exports = {
    addGroup,
    editGroup,
    deleteGroup,
    getGroups,
    getGroup,
};
