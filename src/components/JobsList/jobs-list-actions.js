import { action } from "../../actions/action-creators";
import { fetchJobs } from "../../data/fetch-jobs";

// Action names
export const SET_JOBS_LIST = "SET_JOBS_LIST";
export const SET_JOB_TO_VIEW = "SET_JOB_TO_VIEW";

// Named action methods
export const setJobsList = jobs => action(SET_JOBS_LIST, jobs);
export const setJobToView = jobId => action(SET_JOB_TO_VIEW, jobId);

// Thunks
export const getJobsList = jobQuery => async dispatch => {
  const data = await fetchJobs(jobQuery);
  dispatch(setJobsList(data));
};
