import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
	compose,
} from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, productReducer, groupReducer, cartReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	group: groupReducer,
	cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
