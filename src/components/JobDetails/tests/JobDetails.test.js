import React from "react";
import renderer from "react-test-renderer";
import JobDetails from "../JobDetails";

describe("Job", () => {
  it("should render", () => {
    const component = renderer.create(<JobDetails />);
    let header = component.toJSON();
    expect(header).toMatchSnapshot();
  });
});
