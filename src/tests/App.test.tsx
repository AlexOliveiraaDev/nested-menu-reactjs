import { render, screen } from "@testing-library/react";
import App from "../App";
import NestedMenu from "../components/nested-menu/NestedMenu";
import { mockItems } from "../mocks/itemMock";

describe("Jest", () => {
  it("should work", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("App", () => {
  it("Renders app ", () => {
    render(<App />);
  });
});

describe("NestedMenu Component", () => {
  test("renders without crashing", () => {
    render(<NestedMenu items={mockItems} />);
    expect(screen.getByText("Layers")).toBeTruthy();
  });
});
