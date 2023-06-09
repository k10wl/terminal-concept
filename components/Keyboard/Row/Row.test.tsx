import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";

import { Row } from "./index";

jest.mock("../constants", () => ({ activeKeyCodes: new Set(["KeyB"]) }));

// @ts-expect-error type assertion
const mockKeys = [
  { id: 1, code: "KeyA", name: "A" },
  { id: 2, code: "KeyB", name: "B", grow: true },
  { id: 3, code: "KeyC", name: "C", border: true },
] as ComponentProps<typeof Row>["keys"];

describe("Row", () => {
  it("should render Row component with keys", () => {
    render(<Row keys={mockKeys} />);

    const keyElements = screen.getAllByRole("listitem");

    expect(keyElements).toHaveLength(mockKeys.length);
  });

  it("should render Row component with correct props", () => {
    render(<Row keys={mockKeys} />);

    const keyAElement = screen.getByText("A");
    const keyBElement = screen.getByText("B");
    const keyCElement = screen.getByText("C");

    expect(keyAElement).not.toHaveClass("before:opacity-100");
    // eslint-disable-next-line testing-library/no-node-access
    expect(keyBElement.parentElement).toHaveClass("flex-1");
    expect(keyCElement).toHaveClass("border");
  });

  it("should render Row component with active keys", () => {
    render(<Row keys={mockKeys} />);

    const keyAElement = screen.getByText("A");
    const keyBElement = screen.getByText("B");

    expect(keyAElement).not.toHaveClass("before:opacity-100");
    expect(keyBElement).toHaveClass("before:opacity-100");
  });
});
