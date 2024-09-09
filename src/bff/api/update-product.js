export const updateProduct = ({
	id,
	title,
	group,
	description,
	price,
	image_url,
	amount,
}) =>
	fetch(`http://localhost:3005/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id,
			title,
			group,
			image_url,
			description,
			price,
			amount,
		}),
	});
