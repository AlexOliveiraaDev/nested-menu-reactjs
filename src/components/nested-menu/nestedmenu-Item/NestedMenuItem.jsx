import React, { useState } from "react";
import "./NestedMenuItem.css";
import NestedMenuList from "../nestedmenu-list/NestedMenuList";
import {
  SquareDashed,
  Type,
  Image,
  ChevronDown,
  ChevronUp,
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
      <div onClick={() => switchOpen(!open)}>
        {children.length > 0 && (open ? <ChevronDown /> : <ChevronUp />)}
        {setIcon(icon)}
        <span>{name}</span>
      </div>
      <div hidden={!open}>
        <NestedMenuList items={children} />
      </div>
    </div>
  );
};

export default NestedMenuItem;
