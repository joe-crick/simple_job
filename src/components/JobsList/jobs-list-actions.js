import { action } from "../../actions/action-creators";
import { fetchJobs } from "../../data/fetch-jobs";

// Action names
export const SET_JOBS_LIST = "SET_JOBS_LIST";

// Named action methods
export const setJobsList = cars => action(SET_JOBS_LIST, cars);

// Thunks
export const getJobsList = jobQuery => async dispatch => {
  const data = await fetchJobs(jobQuery);
  dispatch(setJobsList(data));
};
