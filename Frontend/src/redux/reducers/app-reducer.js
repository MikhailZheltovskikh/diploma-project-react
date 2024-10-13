import { ACTION__TYPE } from '../action';

const initialAppState = {
	error: null,
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION__TYPE.AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION__TYPE.AUTH_RESET_ERROR:
			return {
				...state,
				error: null,
			};
		case ACTION__TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
				error: null,
			};
		case ACTION__TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION__TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
