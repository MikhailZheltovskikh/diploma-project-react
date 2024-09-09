import { getProducts, getProductsFilterGroups } from '../api';

export const fetchProducts = async (searchPhrase, page, limit, selectedGroupId) => {

	let response;

	if(selectedGroupId && selectedGroupId !== ''){
		response = await getProductsFilterGroups(searchPhrase, page, limit, selectedGroupId);
	} else{
		response = await getProducts(searchPhrase, page, limit);
	}

	return {
		error: null,
		res: { products: response.products, links: response.links },
	};
};
