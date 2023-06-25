import { render, screen } from "@testing-library/react";

import { Keyboard } from "./index";

describe("Keyboard", () => {
  beforeEach(() => {
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render Keyboard component", () => {
    render(<Keyboard />);

    const keyboardContainer = screen.getByTestId("keyboard-container");

    expect(keyboardContainer).toBeInTheDocument();
    expect(keyboardContainer).toMatchSnapshot();
  });

  it("should add and remove event listeners on mount and unmount", () => {
    const { unmount } = render(<Keyboard />);

    expect(window.addEventListener).toHaveBeenCalledTimes(3);
    expect(window.addEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "keyup",
      expect.any(Function),
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(3);
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "keyup",
      expect.any(Function),
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("should update keyboard size on resize", () => {
    // @ts-expect-error mock the getBoundingClientRect method
    jest.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      width: 100,
      height: 200,
    });
    render(<Keyboard />);

    const keyboardParent = screen.getByTestId("keyboard-parent");

    // Simulate window resize
    Reflect.set(window, "innerWidth", 1000);
    Reflect.set(window, "innerHeight", 800);
    window.dispatchEvent(new Event("resize"));

    const computedStyles = getComputedStyle(keyboardParent);

    expect(computedStyles.getPropertyValue("width")).toBe("100px");
    expect(computedStyles.getPropertyValue("height")).toBe("200px");

    expect(Element.prototype.getBoundingClientRect).toHaveBeenCalledTimes(2); // Initial render + window resize

    // Restore the original implementation of getBoundingClientRect
    jest.spyOn(Element.prototype, "getBoundingClientRect").mockRestore();
  });
});
