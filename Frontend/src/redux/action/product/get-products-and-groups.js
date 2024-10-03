
import { PAGINATION_LIMIT } from '../../../constans';
import { request } from '../../../utils';
import { setGroupsData } from '../group/set-groups-data';
import { setLoading } from '../set-loading';
import { setProductsData } from './set-products-data';

export const getProductsAndGroups = (searchPhrase, page) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		Promise.all([
			request(
				`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			),
			request('/groups'),
		]).then(
			([
				{
					data: { products, lastPage },
				},
				{ data: dataGroups },
			]) => {
				dispatch(setProductsData(products, lastPage));
				dispatch(setGroupsData(dataGroups));
			},
		);
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	} finally {
		dispatch(setLoading(false));
	}
};
