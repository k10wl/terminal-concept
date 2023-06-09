import { fireEvent, render } from "@testing-library/react";

import { Intro } from "./index";

jest.mock("@/lib/utils", () => ({
  createDelay: jest.fn(() => Promise.resolve()),
}));

describe("Intro", () => {
  it("should call onContinue on keydown event", async () => {
    const onContinue = jest.fn();
    render(<Intro onContinue={onContinue} />);

    // Simulate keydown event
    fireEvent(window, new KeyboardEvent("keydown"));

    // Verify that the onContinue callback is called
    expect(onContinue).toHaveBeenCalledTimes(1);

    fireEvent(window, new MouseEvent("click"));
    expect(onContinue).toHaveBeenCalledTimes(2);
  });
});
