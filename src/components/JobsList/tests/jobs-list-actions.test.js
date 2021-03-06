import { getJobsList } from "../jobs-list-actions";
import { SET_JOBS_LIST } from "../jobs-list-actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("async actions", () => {
  it("creates JOBS_LIST when fetching jobs has completed", () => {
    const expected = [{ payload: [], type: "SET_JOBS_LIST" }];
    const store = mockStore({ jobs: [] });
    const actual = store.getActions();

    return store.dispatch(getJobsList()).then(() => {
      expect(actual).toEqual(expected);
    });
  });
});
