import React, { useState } from "react";
import "./NestedMenuItem.css";
import NestedMenuList from "../nestedmenu-list/NestedMenuList";
import {
  SquareDashed,
  Type,
  Image,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";

function setIcon(icon) {
  switch (icon) {
    case "SquareDashed":
      return <SquareDashed className="menu-item-icon" />;
    case "Type":
      return <Type className="menu-item-icon" />;
    case "Image":
      return <Image className="menu-item-icon" />;
    default:
      return <SquareDashed className="menu-item-icon" />;
  }
}

const NestedMenuItem = ({ name, icon, children }) => {
  const [open, switchOpen] = useState(false);
  return (
    <div className="menu-item-main-div">
      <div className="menu-item-row" onClick={() => switchOpen(!open)}>
        {children.length > 0 &&
          (open ? (
            <ChevronDown className="menu-item-arrow" />
          ) : (
            <ChevronRight className="menu-item-arrow" />
          ))}
        <div className="menu-item-gap"></div>
        {setIcon(icon)}
        <span>{name}</span>
        <div onClick={(e) => e.stopPropagation()}>
          <Trash2 className="menu-item-icon menu-item-delete" />
        </div>
      </div>
      {children.length > 0 && (
        <div className="menu-item-children" hidden={!open}>
          <NestedMenuList items={children} />
        </div>
      )}
    </div>
  );
};

export default NestedMenuItem;
