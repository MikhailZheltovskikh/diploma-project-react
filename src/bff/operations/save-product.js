import { addProduct, updateProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const saveProduct = async (hash, newProductData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const saveProduct =
		newProductData.id === ''
			? await addProduct(newProductData)
			: await updateProduct(newProductData);

	return {
		error: null,
		res: saveProduct,
	};
};
