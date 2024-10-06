import { PAGINATION_LIMIT } from '../../../constans';
import { request } from '../../../utils';
import { setProductsData } from './set-products-data';

export const getProductsAsync =
	(searchPhrase, page, sort = '') =>
	async (dispatch) => {
		let req;
		if (sort !== '') {
			let nameSort;
			if (sort === 1) {
				nameSort = 'asc';
			} else {
				nameSort = 'desc';
			}

			req = request(
				`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sort=${nameSort}`,
			);
		} else if (sort === '') {
			req = request(
				`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			);
		}

		try {
			const response = await req;
			const { products, lastPage } = response.data;
			dispatch(setProductsData(products, lastPage));
		} catch (error) {
			// dispatch(setErrorMessage(error.message));
		}
	};
