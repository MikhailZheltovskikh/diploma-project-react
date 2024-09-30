import { server } from '../bff';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(opiration, ...params) => {
			const request = [
				'register',
				'authorize',
				'fetchProduct',
				'fetchProducts',
				'fetchGroups',
			].includes(opiration)
				? params
				: [session, ...params];

			return server[opiration](...request);
		},
		[session],
	);
};
