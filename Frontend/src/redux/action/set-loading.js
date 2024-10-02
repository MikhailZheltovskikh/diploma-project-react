
import { ACTION__TYPE } from './action-type';

export const setLoading = (isLoading) => ({
	type: ACTION__TYPE.SET_LOADING,
	payload: isLoading,
});
