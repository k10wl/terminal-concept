import { fireEvent, render, screen } from "@testing-library/react";

import { IntroAnimation } from "./index";

describe("IntroAnimation", () => {
  const FirstMockAnimationComponent = jest.fn(({ onContinue }) => (
    <button type="button" onClick={onContinue}>
      first
    </button>
  ));
  const SecondMockAnimationComponent = jest.fn(({ onContinue }) => (
    <button type="button" onClick={onContinue}>
      second
    </button>
  ));

  const animationSequence = [
    FirstMockAnimationComponent,
    SecondMockAnimationComponent,
  ];

  it("should render animation components and progresses to the next step", () => {
    render(
      <IntroAnimation animationSequence={animationSequence}>
        children
      </IntroAnimation>,
    );

    // Initial render
    expect(screen.getByText("first")).toBeInTheDocument();

    // Progress to the next step
    fireEvent.click(screen.getByText("first"));
    expect(screen.queryByText("first")).toBeNull();

    // Second animation component rendered
    expect(screen.getByText("second")).toBeInTheDocument();

    // Complete animation
    fireEvent.click(screen.getByText("second"));
    expect(screen.queryByText("second")).toBeNull();
    expect(screen.getByText("children")).toBeInTheDocument();

    // Every animation component rendered once
    expect(FirstMockAnimationComponent).toHaveBeenCalledTimes(1);
    expect(SecondMockAnimationComponent).toHaveBeenCalledTimes(1);
  });
});
