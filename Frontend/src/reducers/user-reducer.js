import { ROLE } from '../constans';
import { ACTION__TYPE } from '../action';

const initialUsersState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	cart: [],
	session: null,
};

export const userReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION__TYPE.ADD_PPRODUCT_CART:
			return {
				...state,
				cart: [...state.cart, action.payload],
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
