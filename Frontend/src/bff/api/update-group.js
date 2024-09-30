export const updateGroup = ({
	id,
	name
}) =>
	fetch(`http://localhost:3005/groups/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id,
			name
		}),
	});
