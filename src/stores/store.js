import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/reducers";
import defaultState from "../state/state";

// Consider refactoring this to take a store and return a function
// Then, you can update the state on initial rendering---maybe this
// is the issue.

export default (state = defaultState) => createStore(rootReducer, state, applyMiddleware(thunk));
