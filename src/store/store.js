import thunk from 'redux-thunk';
import { clientReducer } from '../reducers/clients';
import { HistoriesReducer } from '../reducers/histories';
import { QueriesReducer } from '../reducers/queries';
import { workReducer } from '../reducers/works';
const { createStore, compose, applyMiddleware, combineReducers } = require('redux');
const { authReducer } = require('../reducers/auth');

const reducers = combineReducers({
  auth: authReducer,
  works: workReducer,
  clients: clientReducer,
  histories: HistoriesReducer,
  queries: QueriesReducer,
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
