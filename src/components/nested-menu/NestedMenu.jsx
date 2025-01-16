import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuItem from "./nestedmenu-Item/NestedMenuItem";

const NestedMenu = ({items}) => {

  const [isHeaderOpen, setHeaderOpen] = useState(true);

  const handleHeaderClick = () => {
    setHeaderOpen(!isHeaderOpen);
  }

  return (
    <div className="main-div">
      <NestedMenuHeader onHeaderClick={handleHeaderClick} />
      <div hidden={isHeaderOpen}>
      {items.map(({name, icon, children}, index) => (
        <NestedMenuItem/>
      ))}
      </div>
    </div>
  );
};

export default NestedMenu;
