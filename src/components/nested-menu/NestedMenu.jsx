import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuList from "./nestedmenu-list/NestedMenuList";
import NestedMenuDropdown from "./nestedmenu-dropdown/NestedMenuDropdown";

const NestedMenu = ({ items }) => {
  const [headerState, setHeaderVisibility] = useState(true);
  const [data, setData] = useState(items);
  const [dropdownState, setDropdown] = useState(false);

  const handleClickDropdown = (e) => {
    toggleDropdown();
    switch (e) {
      case 0:
        addItem({name: "New Container", icon: "SquareDashed"});
        break;
      case 1:
        addItem({name: "New Text", icon: "Type"});
        break;
      case 2:
        addItem({name: "New Image", icon: "Image"});
        break;
      default:
        break;
    }
  }

  const toggleDropdown = () => {
    setDropdown(!dropdownState);
  }

  const addItem = ({name, icon}) => {
    const updateData = [...data];
    updateData.push({
      name: name,
      icon: icon,
      children: [],
    })
    setData(updateData);
  }

  const addItemChild = ({name, icon, index}) => {
    const updateData = [...data];
    updateData[index].children.push({
      name: "New Item",
      icon: icon,
      children: [],
    })
    setData(updateData);
  }

  // Recieve a callback from NestedMenuHeader
  const handleHeaderClick = () => {
    setHeaderVisibility(!headerState);
  };

  return (
    <div className="main-div">
      {dropdownState && <div className="add-dropdown"><NestedMenuDropdown onClick={handleClickDropdown}/></div>}
      
      <NestedMenuHeader onHeaderClick={(e) => handleHeaderClick(e)} onAddClick={toggleDropdown}/>
      <div
        className="main-items-div"
        style={{ display: headerState ? "flex" : "none" }}
      >
        {<NestedMenuList items={data} />}
      </div>
    </div>
  );
};

export default NestedMenu;
