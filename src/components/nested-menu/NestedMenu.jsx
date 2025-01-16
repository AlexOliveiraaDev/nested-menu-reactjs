import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuItem from "./nestedmenu-Item/NestedMenuItem";
import { MagicMotion } from "react-magic-motion";

const NestedMenu = ({items}) => {
  const [headerState, getHeaderState] = useState(false);

  // Recieve a callback from NestedMenuHeader
  const handleHeaderClick = () => {
    getHeaderState(!headerState);
  }

  return (
    <MagicMotion>
    <div className="main-div">
      <NestedMenuHeader onHeaderClick={handleHeaderClick} />
      <div className="main-items-div" hidden={headerState}>
      {items.map(({name, icon, children}, index) => (
        <NestedMenuItem key={index} name={name} icon={icon} children={children}/>
      ))}
      </div>
    </div>
    </MagicMotion>
  );
};

export default NestedMenu;
