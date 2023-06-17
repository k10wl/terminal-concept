import { fireEvent, render } from "@testing-library/react";

import { Intro } from "./index";

jest.mock("@/lib/utils", () => ({
  createDelay: jest.fn(() => Promise.resolve()),
}));

describe("Intro", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call onContinue once and remove listeners on keydown event", () => {
    const onContinue = jest.fn();
    render(<Intro onContinue={onContinue} />);

    fireEvent(window, new KeyboardEvent("keydown"));

    expect(onContinue).toHaveBeenCalledTimes(1);

    fireEvent(window, new KeyboardEvent("keydown"));
    fireEvent(window, new MouseEvent("click"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("should call onContinue once and remove listeners on click event", () => {
    const onContinue = jest.fn();
    render(<Intro onContinue={onContinue} />);

    fireEvent(window, new MouseEvent("click"));

    expect(onContinue).toHaveBeenCalledTimes(1);

    fireEvent(window, new KeyboardEvent("keydown"));
    fireEvent(window, new MouseEvent("click"));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
