import { PAGINATION_LIMIT } from '../../constans';
import { request } from '../../utils';
import { setProductsData } from './product/set-products-data';

export const getProductsFilterGroupAsync =
	(searchPhrase, page, selectedGroupId, priceSort = '') =>
	async (dispatch) => {
		let req;
		if (priceSort !== '') {
			let nameSort;
			if (priceSort === 1) {
				nameSort = 'asc';
			} else {
				nameSort = 'desc';
			}

			req = request(
				`/catalog?group=${selectedGroupId}&search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sort=${nameSort}`,
			);
		} else if (priceSort === '') {
			req = request(
				`/catalog?group=${selectedGroupId}&search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
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
