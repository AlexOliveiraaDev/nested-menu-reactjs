import React from "react";
import { useState } from "react";
import "./NestedMenu.css";
import NestedMenuHeader from "./nestedmenu-header/NestedMenuHeader";
import NestedMenuItem from "./nestedmenu-Item/NestedMenuItem";
import NestedMenuList from "./nestedmenu-list/NestedMenuList";

const NestedMenu = ({ items }) => {
  const [headerState, setVisible] = useState(true);

  // Recieve a callback from NestedMenuHeader
  const handleHeaderClick = () => {
    setVisible(!headerState);
  };

  return (
    <div className="main-div">
      <NestedMenuHeader onHeaderClick={handleHeaderClick} />
      <div
        className="main-items-div"
        style={{ display: headerState ? "flex" : "none" }}
      >
        {<NestedMenuList items={items} />}
      </div>
    </div>
  );
};

export default NestedMenu;
