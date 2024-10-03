import { ROLE } from '../../constans';
import { ACTION__TYPE } from '../action';

const initialUsersState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	cart: [],
	session: null,
	users: {
		isLoading: true,
		error: null,
		users: [],
		roles: [],
	},
};

export const userReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION__TYPE.ADD_PPRODUCT_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
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
