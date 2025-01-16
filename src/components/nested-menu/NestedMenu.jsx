import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuItem from "./nestedmenu-Item/NestedMenuItem";

const NestedMenu = ({items}) => {

  const [headerState, getHeaderState] = useState(true);

  // Recieve a callback from NestedMenuHeader
  const handleHeaderClick = () => {
    getHeaderState(headerState);
  }

  return (
    <div className="main-div">
      <NestedMenuHeader onHeaderClick={handleHeaderClick} />
      <div hidden={headerState}>
      {items.map(({name, icon, children}, index) => (
        <NestedMenuItem/>
      ))}
      </div>
    </div>
  );
};

export default NestedMenu;
