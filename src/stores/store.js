import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/reducers";
import state from '../state/state';

export default createStore(rootReducer, state, applyMiddleware(thunk));
