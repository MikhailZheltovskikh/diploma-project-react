export const saveProductAsync = (requestServer, newProductData) => () => {
	requestServer('saveProduct', newProductData)
};
