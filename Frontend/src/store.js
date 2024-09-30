import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
	compose,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	productReducer,
	productsReducer,
	groupReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	products: productsReducer,
	group: groupReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
