import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NestedMenu from "../components/nested-menu/NestedMenu";
import App from "../App";

const mockItems = [
  {
    id: "1",
    name: "Item 1",
    icon: "SquareDashed",
    children: [],
  },
  {
    id: "2",
    name: "Item 2",
    icon: "Type",
    children: [],
  },
];

describe("NestedMenu Interactions", () => {
  // Test 1: Double click editing
  test("double click enables editing mode and updates text", async () => {
    render(<NestedMenu items={mockItems} />);
    const itemText = screen.getByText("Item 1");
    fireEvent.doubleClick(itemText);

    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated Item");

    fireEvent.blur(input);
    expect(screen.getByText("Updated Item")).toBeInTheDocument();
  });

  // Test 2: Add button shows dropdown
  test("clicking add button shows dropdown", () => {
    render(<NestedMenu items={mockItems} />);

    expect(screen.queryByText("Container")).not.toBeInTheDocument();
    expect(screen.queryByText("Text")).not.toBeInTheDocument();
    expect(screen.queryByText("Image")).not.toBeInTheDocument();
    const addButton = screen.getByLabelText("add-header-button");
    fireEvent.click(addButton);
    expect(screen.getByText("Container")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
  });

  // Test 3: Dropdown selection adds item
  test("selecting dropdown item adds new item and closes dropdown", async () => {
    render(<NestedMenu items={mockItems} />);
    const addButton = screen.getByLabelText("add-header-button");
    fireEvent.click(addButton);

    const containerOption = screen.getByText("Container");
    fireEvent.click(containerOption);

    // check if dropdown closed and new item added
    expect(screen.queryByText("Container")).not.toBeInTheDocument();
    expect(screen.getByText("New Container")).toBeInTheDocument();
  });

  // Test 4: Drag and drop nesting
  test("dragging item over another item nests it as child", async () => {
    render(<NestedMenu items={mockItems} />);

    const sourceItem: any = screen.getByText("Item 1").closest(".menu-item-main-div");
    const targetItem: any = screen.getByText("Item 2").closest(".menu-item-main-div");

    // simulate drag and drop
    fireEvent.dragStart(sourceItem);
    fireEvent.dragEnter(targetItem);
    fireEvent.dragOver(targetItem);
    fireEvent.drop(targetItem);
    fireEvent.dragEnd(sourceItem);

    // pick new references
    const updatedTarget: any = screen.getByText("Item 2").closest(".nested-menu-list");
    const updatedSource: any = screen.getByText("Item 1").closest(".menu-item-wrapper");

    //check if items are nested
    expect(updatedTarget).toContainElement(updatedSource);
  });

  // Test 5: Delete item
  test("clicking trash button removes the item", () => {
    render(<NestedMenu items={mockItems} />);

    //get main container
    const deleteButton: any = screen.getByText("Item 1").closest(".menu-item-row");
    //click in delete button by class
    fireEvent.click(deleteButton.querySelector(".menu-item-delete"));
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  // Test 6: Clicking code button opens code window
  test("clicking code buttomon opens code window", () => {
    render(<NestedMenu items={mockItems} />);

    expect(screen.queryByText("JSON")).not.toBeInTheDocument();
    const jsonButton: any = screen.getByTestId("json-button");
    fireEvent.click(jsonButton);

    expect(screen.getByText("JSON")).toBeInTheDocument();
  });

  // Test 7: Test App main component
  test("App renders correctly", () => {
    render(<App />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
});
