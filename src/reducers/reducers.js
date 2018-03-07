import DEFAULT from "../state/state";
import josbListReducers from "../components/JobsList/jobs-list-reducers";

const REDUX_INIT = "@@redux/INIT";

const actions = {
  [REDUX_INIT]: state => state,
  ...josbListReducers
};

const rootReducer = (state = DEFAULT, action) => {
  const { type, payload } = action;
  console.log("type:", type);
  if (actions.hasOwnProperty(type)) {
    return actions[type](state, payload);
  } else {
    throw new Error("Action not found");
  }
};

export default rootReducer;
