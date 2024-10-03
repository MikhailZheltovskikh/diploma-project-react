const Group = require('../modules/Group');

// add
async function addGroup(group) {
    return Group.create(group);
}

// edit
async function editGroup(id, group) {
    const newGroup = await Group.findByIdAndUpdate(id, group, { new: true });

    return newGroup;
}

// delete
function deleteGroup(id) {
    return Group.deleteOne({ _id: id });
}

// get list 
function getGroups() {
    return Group.find();
}

// get item
function getGroup(id) {
    return Group.findById(id);
}

module.exports = {
    addGroup,
    editGroup,
    deleteGroup,
    getGroups,
    getGroup,
};
