import { PAGINATION_LIMIT } from "../../../constans";
import { request } from "../../../utils";
import { setLoading } from "../set-loading";
import { setProductsData } from "./set-products-data";




export const getProducts = (searchPhrase, page) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await request(
			`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		);
		const { products, lastPage } = response.data;
		dispatch(setProductsData(products, lastPage));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	} finally {
		dispatch(setLoading(false));
	}
};
