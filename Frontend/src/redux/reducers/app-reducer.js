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
	modalError: {
		isOpen: false,
		error: '',
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
		case ACTION__TYPE.OPEN_ERROR_MODAL:
			return {
				...state,
				modalError: {
					...state.modalError,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION__TYPE.CLOSE_ERROR_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
