import { ACTION__TYPE } from '../action';

const initialGroupsState = {
	groups: [],
	isLoading: true,
	error: null,
};

export const groupsReducer = (state = initialGroupsState, action) => {
	switch (action.type) {
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
