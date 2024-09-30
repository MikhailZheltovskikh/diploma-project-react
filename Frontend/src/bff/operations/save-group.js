import { addGroup, updateGroup } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constans';

export const saveGroup = async (hash, newGroupData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const saveGroup =
		newGroupData.id === ''
			? await addGroup(newGroupData)
			: await updateGroup(newGroupData);

	return {
		error: null,
		res: saveGroup,
	};
};
