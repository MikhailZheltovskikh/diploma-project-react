import { ROLE } from '../../constans';
import { ACTION__TYPE } from '../action';

const initialUsersState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
	users: {
		isLoading: true,
		users: [],
		roles: [],
		error: null,
	},
};

export const userReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION__TYPE.PRODUCT_ERROR:
			return {
				...state,
				users: {
					error: action.payload,
				},
			};
		case ACTION__TYPE.PRODUCT_RESET_ERROR:
			return {
				...state,
				users: {
					error: null,
				},
			};
		case ACTION__TYPE.EDIT_USER:
			return {
				...state,
				users: {
					...state.users,
					users: state.users.users.map((user) => {
						return user.id === action.payload.id ? action.payload : user;
					}),
				},
			};
		case ACTION__TYPE.REMOVE_USER:
			return {
				...state,
				users: {
					...state.users,
					users: state.users.users.filter((user) => user.id !== action.payload),
				},
			};
		case ACTION__TYPE.SET_ROLES:
			return {
				...state,
				users: {
					...state.users,
					roles: action.payload,
				},
				isLoading: false,
			};

		case ACTION__TYPE.SET_USERS:
			return {
				...state,
				users: {
					...state.users,
					users: action.payload,
					isLoading: false,
				},
			};
		case ACTION__TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};

		case ACTION__TYPE.LOGOUT:
			return initialUsersState;
		default:
			return state;
	}
};
