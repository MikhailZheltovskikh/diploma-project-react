import { deleteProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removeProduct = async (hash, productId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	deleteProduct(productId);
	
	return {
		error: null,
		res: true,
	};
};
