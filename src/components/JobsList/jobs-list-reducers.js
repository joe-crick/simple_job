import { SET_JOBS_LIST } from "./jobs-list-actions";

export default {
  [SET_JOBS_LIST]: (state, jobsList) => ({ ...state, jobsList })
};
