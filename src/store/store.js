import thunk from "redux-thunk";
import { ordersReducer } from "../reducers/ordersReducer";
import { clientReducer } from "../reducers/clients";
import { workReducer } from "../reducers/works";
const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} = require("redux");
const { authReducer } = require("../reducers/auth");

const reducers = combineReducers({
  auth: authReducer,
  works: workReducer,
  clients: clientReducer,
  orders: ordersReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
