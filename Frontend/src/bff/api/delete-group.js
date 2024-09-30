export const deleteGroup = (groupId) =>
	fetch(`http://localhost:3005/groups/${groupId}`, {
		method: 'DELETE',
	});
