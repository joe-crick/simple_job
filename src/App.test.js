import React from "react";
import ReactDOM from "react-dom";
import App, { getJobPage, isIntersection } from "./App";
import { shallow } from "enzyme";
import { jobData } from "./data/job-test-data";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("App", () => {
  let store = {};

  beforeEach(() => {
    store = mockStore({ jobsList: jobData(10) });
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App store={store} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should increment the number of visible jobs if an intersection point has been crossed", () => {
    const expected = 10;
    const intersectionEntries = [{ intersectionRatio: 0.5 }];
    const component = shallow(<App store={store} />).dive();
    component.instance().paginateJobs(intersectionEntries);
    const actual = component.state("jobSetBegin");
    expect(actual).toEqual(expected);
  });
});

describe("getJobPage", () => {
  const COUNT = 35;
  const jobs = jobData(COUNT);

  it("should return a slice of the provided array, when given a base", () => {
    const expected = 10;
    const actual = getJobPage(jobs, 0).length;
    expect(actual).toEqual(expected);
  });
});

describe("isIntersection", () => {
  it("should return true if there is an intersection ratio", () => {
    const expected = true;
    const sut = [{ intersectionRatio: 0.5 }];
    const actual = isIntersection(sut);
    expect(actual).toEqual(expected);
  });
  it("should return false if there is not an intersection ratio", () => {
    const expected = false;
    const sut = [{ intersectionRatio: 0 }];
    const actual = isIntersection(sut);
    expect(actual).toEqual(expected);
  });
});
