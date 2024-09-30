import { deleteGroup } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const removeGroup = async (hash, groupId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	deleteGroup(groupId);

	return {
		error: null,
		res: true,
	};
};
