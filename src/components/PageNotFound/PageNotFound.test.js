import React from "react";
import { PageNotFound } from "./PageNotFound";
import renderer from "react-test-renderer";
import { i18nMock } from "test/test-utils";

describe("PageNotFound", () => {
  it("should render", () => {
    const component = renderer.create(<PageNotFound t={i18nMock} />);
    let header = component.toJSON();
    expect(header).toMatchSnapshot();
  });
});
