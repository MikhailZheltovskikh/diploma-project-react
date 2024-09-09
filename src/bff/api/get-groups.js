export const getGroups = () =>
	fetch('http://localhost:3005/groups').then((loadedGroups) => loadedGroups.json());
