import rootReducer from "../../../reducers/reducers";
import { SET_JOBS_LIST, SET_JOB_TO_VIEW } from "../jobs-list-actions";
import { jobData } from "../../../data/job-test-data";

describe("jobs-list-reducer", () => {
  const initialState = {
    jobsList: []
  };

  it("should throw if given an invalid action", () => {
    expect(() => rootReducer(undefined, {})).toThrow();
  });

  it("should handle SET_JOBS_LIST", () => {
    const payload = jobData(1);
    const expected = { jobsList: payload };
    const actual = rootReducer(initialState, {
      type: SET_JOBS_LIST,
      payload
    });
    expect(actual).toEqual(expected);
  });

  it("should handle SET_JOB_TO_VIEW", () => {
    const payload = jobData(1);
    const expected = { jobsList: payload };
    const actual = rootReducer(initialState, {
      type: SET_JOB_TO_VIEW,
      payload
    });
    expect(actual).toEqual(expected);
  });

});
