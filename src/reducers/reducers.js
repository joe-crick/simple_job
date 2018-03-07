import DEFAULT from "../state/state";
import josbListReducers from "../components/JobsList/jobs-list-reducers";

const REDUX_INIT = "@@redux/INIT";

const actions = {
  [REDUX_INIT]: state => state,
  ...josbListReducers
};

// Normal Redux practice is to return the default state when provided with an invalid action
// However, this can give rise to an issue that is similar to the suppressed error problem
// when code catches an error, and silently dies. Therefore, rather than merely returning default
// state, throw an error when the reducer gets an action it doesn't recognize. In addition, then,
// explicitly define actions for the @@redux actions provided by redux.
const rootReducer = (state = DEFAULT, action) => {
  const { type, payload } = action;
  if (actions.hasOwnProperty(type)) {
    return actions[type](state, payload);
  } else {
    throw new Error("Action not found");
  }
};

export default rootReducer;
