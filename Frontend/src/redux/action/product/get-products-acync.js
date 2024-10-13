import { PAGINATION_LIMIT } from '../../../constans';
import { request } from '../../../utils';
import { openModalError } from '../modal';
import { productError } from './product-error';
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

			if (response.error) {
				dispatch(productError(response.error));
				dispatch(
					openModalError({
						error: response.error,
					}),
				);
				return;
			}

			const { products, lastPage } = response.data;
			dispatch(setProductsData(products, lastPage));
		} catch (error) {
			console.log('Возникла ошибка при обращении к серверу');
			dispatch(
				openModalError({
					error: 'При получении товаров произошла ошибка',
				}),
			);
		}
	};
