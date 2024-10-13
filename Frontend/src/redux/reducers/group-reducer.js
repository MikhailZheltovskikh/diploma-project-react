import { ACTION__TYPE } from '../action';

const initialGroupState = {
	groups: [],
	isLoading: true,
	error: null,
};

export const groupReducer = (state = initialGroupState, action) => {
	switch (action.type) {
		case ACTION__TYPE.GROUP_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION__TYPE.GROUP_RESET_ERROR:
			return {
				...state,
				error: null,
			};
		case ACTION__TYPE.ADD_GROUP:
			return {
				...state,
				groups: [...state.groups, action.payload],
			};
		case ACTION__TYPE.EDIT_GROUP:
			return {
				...state,
				groups: state.groups.map((group) => {
					return group.id === action.payload.id ? action.payload : group;
				}),
			};
		case ACTION__TYPE.REMOVE_GROUP:
			return {
				...state,
				groups: state.groups.filter((group) => group.id !== action.payload),
			};
		case ACTION__TYPE.SET_GROUPS_DATA:
			return {
				...state,
				groups: action.payload,
				isLoading: false,
			};
		default:
			return state;
	}
};
