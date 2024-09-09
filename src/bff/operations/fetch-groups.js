import { getGroups } from '../api';

export const fetchGroups = async () => {
	const groups = await getGroups();

	return {
		error: null,
		res: groups,
	};
};
