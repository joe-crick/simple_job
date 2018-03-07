import { action } from "../../actions/action-creators";
import { fetchJobs } from "../../data/fetch-jobs";

// Action names
export const SET_JOBS_LIST = "SET_JOBS_LIST";

// Named action methods
export const setJobsList = jobs => action(SET_JOBS_LIST, jobs);

// Thunks
export const getJobsList = jobQuery => async dispatch => {
  const data = await fetchJobs(jobQuery);
  dispatch(setJobsList(data));
};
