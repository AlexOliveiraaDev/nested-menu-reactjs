import { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Braces } from "lucide-react";

import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuList from "./nestedmenu-list/NestedMenuList";
import NestedMenuDropdown from "./nestedmenu-dropdown/NestedMenuDropdown";
import CodeWindow from "../code-window/CodeWindow";
import { Item, NestedMenuProps } from "../../types/NestedMenuTypes";

import { useDropdownState } from "../../hooks/useDropdownState";
import {
  addUniqueIds,
  findItemById,
  removeItemAtPath,
  addItemToPath,
  generateUUID,
  updateItemName,
  removeItemById,
  getItemDepth,
} from "../../hooks/nestedMenuUtils";

const NestedMenu: React.FC<NestedMenuProps> = ({ items }) => {
  const [headerState, setHeaderVisibility] = useState(true);
  const [data, setData] = useState(addUniqueIds(items));
  const { isOpen: dropdownState, toggleDropdown } = useDropdownState();

  const addItem = (newItem: Item) => {
    setData((prevData: Item[]) => [...prevData, newItem]);
  };

  const handleClickDropdown = (index: number) => {
    toggleDropdown();
    const newId = generateUUID();
    const newItems = [
      { name: "New Container", icon: "SquareDashed", id: newId },
      { name: "New Text", icon: "Type", id: newId },
      { name: "New Image", icon: "Image", id: newId },
    ];
    if (index >= 0 && index < newItems.length) addItem(newItems[index]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    if (getItemDepth(data, over.id) >= 2) return; // limit to 2 levels

    const activeId = active.id;
    const overId = over.id;

    const activeItem = findItemById(data, activeId);
    if (!activeItem) return;

    const { newItems, removedItem } = removeItemAtPath(data, activeItem.path);
    const updatedItems = addItemToPath(newItems, removedItem, overId);

    setData(updatedItems);
  };

  const handleHeaderClick = () => setHeaderVisibility(!headerState);

  // constrains the drag not consume the click event
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const updateName = (id: string, newName: string) => {
    const updatedItems = updateItemName(data, id, newName);
    setData(updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = removeItemById(data, id);
    setData(updatedItems!.newItems);
  };

  const [toggleCodeWindow, setToggleCodeWindow] = useState(false);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      {dropdownState && (
        <div className="add-dropdown">
          <NestedMenuDropdown onClick={handleClickDropdown} />
        </div>
      )}
      <div className="main-div">
        <NestedMenuHeader
          onHeaderClick={handleHeaderClick}
          onAddClick={toggleDropdown}
        />
        <div
          className="main-items-div"
          style={{ display: headerState ? "flex" : "none" }}
        >
          <NestedMenuList
            items={data}
            onClickDelete={(id: string) => handleRemoveItem(id)}
            onUpdateName={updateName}
          />
        </div>
      </div>
      <button
        className="json-button"
        onClick={() => setToggleCodeWindow(true)}
      >
        <Braces className="json-icon" />
      </button>
      {toggleCodeWindow && (
        <div className="code-window">
          <CodeWindow
            code={JSON.stringify(data, null, 2)}
            onClose={() => setToggleCodeWindow(false)}
          />
        </div>
      )}
    </DndContext>
  );
};

export default NestedMenu;
