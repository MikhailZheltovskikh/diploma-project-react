import { PAGINATION_LIMIT } from '../../constans';
import { request } from '../../utils';
import { setProductsData } from './product/set-products-data';

export const getProductsFilterGroupAsync =
	(searchPhrase, page, selectedGroupId) => async (dispatch) => {
		try {
			const response = await request(
				`/catalog?group=${selectedGroupId}&search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			);
			const { products, lastPage } = response.data;
			dispatch(setProductsData(products, lastPage));
		} catch (error) {
			// dispatch(setErrorMessage(error.message));
		}
	};
