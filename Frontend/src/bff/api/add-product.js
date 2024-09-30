export const addProduct = ({ title, group, image_url, description, price, amount }) =>
	fetch('http://localhost:3005/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			group,
			image_url,
			description,
			price,
			amount,
		}),
	}).then((createdPost) => createdPost.json());
