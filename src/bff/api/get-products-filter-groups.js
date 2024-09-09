import { transformProduct } from '../transformers';

export const getProductsFilterGroups = (searchPhrase, page, limit, selectedGroupId) =>
	fetch(
		`http://localhost:3005/products?group=${selectedGroupId}&title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links: links || null,
		}));
