import { action } from "../../actions/action-creators";

// Action names
export const SET_JOBS_LIST = "SET_JOBS_LIST";

// Named action methods
export const setJobsList = cars => action(SET_JOBS_LIST, cars);

// Thunks
export const getJobsList = jobQuery => dispatch => async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/joe-crick/hey_jobs/master/fixtures/jobsList-list.json"
  );
  const data = await response.json();
  dispatch(setJobsList(data));
};
