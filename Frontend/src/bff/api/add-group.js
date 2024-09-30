export const addGroup = ({ name }) =>
	fetch('http://localhost:3005/groups', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name
		}),
	}).then((createdGroup) => createdGroup.json());
