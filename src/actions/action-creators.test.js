import action from "./action-creator";

describe("actions", () => {
  it("should create a redux action", () => {
    const payload = "Test";
    const ACTION = "Test";
    const expected = {
      type: ACTION,
      payload
    };
    const actual = action(ACTION, payload);
    expect(actual).toEqual(expected);
  });
});
