import { flipReveal } from "./index";

describe("flipReveal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should reveal characters after defined time", () => {
    const onChange = jest.fn();
    const string = "123";

    flipReveal(string, onChange, 1000);

    jest.runAllTimers();

    expect(onChange).toHaveBeenCalled();
    expect(onChange).not.toBeCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(string);
  });
});
