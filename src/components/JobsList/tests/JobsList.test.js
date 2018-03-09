import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import ConnectedJobList, { JobList, isSentinel, jobCount } from "../JobsList";
import { jobData } from "../../../data/job-test-data";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

const COUNT = 10;
const jobs = jobData(COUNT);

describe("JobsList", () => {
  it("should render", () => {
    const component = renderer.create(<JobList />);
    let header = component.toJSON();
    expect(header).toMatchSnapshot();
  });
  it("should display a list of jobsList when given an array of jobsList", () => {
    const expected = COUNT;
    const component = mount(<JobList jobs={jobs} />);
    const actual = component.find(".JobThumbnail").length;
    expect(actual).toEqual(expected);
  });
  it("should display nothing found message when not given jobsList", () => {
    const expected = 1;
    const component = mount(<JobList />);
    const actual = component.find(".no-jobs").length;
    expect(actual).toEqual(expected);
  });
  it("should mark the fifth to last row of data as a sentinel", () => {
    const expected = true;
    const component = mount(<JobList jobs={jobs} />);
    const sentinelJob = component.find(".JobThumbnail").at(jobs.length - 5);
    const actual = sentinelJob.hasClass("sentinel");
    expect(actual).toEqual(expected);
  });
  it("should update the selected job when the user opts to view job details", () => {
    const expected = [{ payload: 1, type: "SET_JOB_TO_VIEW" }];
    const store = mockStore({ jobsList: jobs, jobId: 0 });
    const mockEvent = { target: { dataset: { id: 1 } }, preventDefault: () => {} };
    const component = shallow(<ConnectedJobList store={store} history={[]} />).dive();
    component.instance().viewJobDetails(mockEvent);
    const actual = store.getActions();
    expect(actual).toEqual(expected);
  });
});

describe("isSentinel", () => {
  it('should return "sentinel" if the first argument is 1, and the length is 6', () => {
    const expected = "sentinel";
    const actual = isSentinel(1, 6);
    expect(actual).toEqual(expected);
  });
  it('should return "" if the first argument is 1, and the length is 1', () => {
    const expected = "";
    const actual = isSentinel(1, 2);
    expect(actual).toEqual(expected);
  });
});

describe("jobCount", () => {
  it("should return the length of an array if one is provided", () => {
    const expected = 1;
    const test = [1];
    const actual = jobCount(test);
    expect(actual).toEqual(expected);
  });
  it("should return 0 if a falsy value is provided", () => {
    const expected = 0;
    const actual = jobCount();
    expect(actual).toEqual(expected);
  });
});
