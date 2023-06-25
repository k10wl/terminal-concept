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
});
