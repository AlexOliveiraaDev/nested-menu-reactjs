import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuList from "./nestedmenu-list/NestedMenuList";
import NestedMenuDropdown from "./nestedmenu-dropdown/NestedMenuDropdown";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useDropdownState } from "../../hooks/useDropdownState";
import {
  addUniqueIds,
  findItemById,
  removeItemAtPath,
  addItemToPath,
  generateUUID,
} from "../../hooks/nestedMenuUtils";

const NestedMenu = ({ items }) => {
  const [headerState, setHeaderVisibility] = useState(true);
  const [data, setData] = useState(addUniqueIds(items));
  const { isOpen: dropdownState, toggleDropdown } = useDropdownState();

  const addItem = (newItem) => {
    setData((prevData) => [...prevData, newItem]);
  };

  const handleClickDropdown = (e) => {
    toggleDropdown();
    const newId = generateUUID();
    const newItems = [
      { name: "New Container", icon: "SquareDashed", id: newId },
      { name: "New Text", icon: "Type", id: newId },
      { name: "New Image", icon: "Image", id: newId },
    ];
    if (e >= 0 && e < newItems.length) addItem(newItems[e]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;

    const activeItem = findItemById(data, activeId);
    if (!activeItem) return;

    const { newItems, removedItem } = removeItemAtPath(data, activeItem.path);
    const updatedItems = addItemToPath(newItems, removedItem, overId);

    setData(updatedItems);
  };

  const handleHeaderClick = () => setHeaderVisibility(!headerState);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="main-div">
        {dropdownState && (
          <div className="add-dropdown">
            <NestedMenuDropdown onClick={handleClickDropdown} />
          </div>
        )}
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
            onClickDelete={(id) => console.log("Clicou!", id)}
          />
        </div>
      </div>
    </DndContext>
  );
};

export default NestedMenu;
