import { SET_JOBS_LIST, SET_JOB_TO_VIEW } from "./jobs-list-actions";

export default {
  [SET_JOBS_LIST]: (state, jobsList) => ({ ...state, jobsList }),
  [SET_JOB_TO_VIEW]: (state, jobId) => ({ ...state, jobId })
};
