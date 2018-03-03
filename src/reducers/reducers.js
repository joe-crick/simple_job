import DEFAULT from "../state/state";
import jobPostingReducers from "../components/JobsList/jobs-list-reducers";

const REDUX_INIT = "@@redux/INIT";

const actions = {
  [REDUX_INIT]: (state, action) => state,
  ...jobPostingReducers
};

const rootReducer = (state = DEFAULT, action) => {
  const { type, payload } = action;
  if (actions.hasOwnProperty(type)) {
    return actions[type](state, payload);
  } else {
    throw new Error("Action not found");
  }
};

export default rootReducer;
