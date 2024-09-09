export const deleteProduct = (productId) =>
	fetch(`http://localhost:3005/products/${productId}`, {
		method: 'DELETE',
	});
