import { render, screen } from "@testing-library/react";
import { act, Simulate } from "react-dom/test-utils";

import { useTriggerRerender } from "@/hooks";
import click = Simulate.click;
import doubleClick = Simulate.doubleClick;

const TEST_ID = 0;

let testNumber = 0;
function TestComponent() {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const triggerRerender = useTriggerRerender();

  const handleNonStateUpdate = () => {
    testNumber += 1;
  };

  return (
    <button
      type="button"
      data-testid={TEST_ID}
      onClick={handleNonStateUpdate}
      onDoubleClick={() => {
        triggerRerender();
        handleNonStateUpdate();
      }}
    >
      {testNumber}
    </button>
  );
}

describe("useTriggerRerender", () => {
  render(<TestComponent />);

  const button = screen.getByTestId(TEST_ID);

  it("should trigger component rerender call", () => {
    expect(testNumber).toBe(0);
    expect(button.textContent).toBe("0");

    act(() => {
      click(button);
    });

    expect(testNumber).toBe(1);
    expect(button.textContent).toBe("0"); // Text content doesn't change since it's not state

    act(() => {
      doubleClick(button); // Trigger rerender runs on double click
    });
    expect(testNumber).toBe(2);
    expect(button.textContent).toBe("2");

    act(() => {
      click(button);
    });

    expect(testNumber).toBe(3);
    expect(button.textContent).toBe("2");

    act(() => {
      doubleClick(button); // Trigger rerender runs on double click
    });

    expect(testNumber).toBe(4);
    expect(button.textContent).toBe("4");
  });
});
