import { render, screen } from "@testing-library/react";

import { Key } from "./index";

describe("Key", () => {
  it("should render Key component with default props", () => {
    render(<Key name="A" pressed={false} grow={false} border={false} />);

    const keyElement = screen.getByText("A");

    expect(keyElement).toBeInTheDocument();
    expect(keyElement).not.toHaveClass("border");
    expect(keyElement).not.toHaveClass("flex-1");
  });

  it("should render Key component with pressed state", () => {
    render(<Key name="B" pressed grow={false} border={false} />);

    const keyElement = screen.getByText("B");

    expect(keyElement).toHaveClass("contrast-bg");
  });

  it("should render Key component with grow class", () => {
    render(<Key name="C" pressed={false} grow border={false} />);

    const keyElement = screen.getByRole("listitem");

    expect(keyElement).toHaveClass("flex-1");
  });

  it("should render Key component with border class", () => {
    render(<Key name="D" pressed={false} grow={false} border />);

    const keyElement = screen.getByText("D");

    expect(keyElement).toHaveClass("border");
    expect(keyElement).toHaveClass("border-gray-950/25");
    expect(keyElement).toHaveClass("dark:border-gray-50/25");
  });
});
