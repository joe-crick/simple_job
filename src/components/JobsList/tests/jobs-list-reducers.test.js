import rootReducer from "../../../reducers/reducers";
import { SET_JOBS_LIST } from "../jobs-list-actions";
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
});
