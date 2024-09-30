export const transformProduct = (dbProduct) => ({
	id: dbProduct.id,
	title: dbProduct.title,
	group: dbProduct.group,
	image_url: dbProduct.image_url,
	description: dbProduct.description,
	price: dbProduct.price,
	amount: dbProduct.amount
});
