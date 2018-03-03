import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import JobThumbnail from "./JobThumbnail";

describe("Job", () => {
  it("should render", () => {
    const component = renderer.create(<JobThumbnail />);
    let header = component.toJSON();
    expect(header).toMatchSnapshot();
  });
  it("should run a function when the buy button is clicked.", () => {
    const noop = jest.fn();
    const component = mount(<JobThumbnail buyNow={noop} />);
    component.find(".JobThumbnail-button").simulate("click");
    expect(noop).toHaveBeenCalled();
  });
});
