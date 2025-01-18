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
import { useDraggable, useDroppable } from "@dnd-kit/core";


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

const NestedMenuItem = ({ id, name, icon, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { setNodeRef: setDroppableRef } = useDroppable({ id: id });


  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const [open, switchOpen] = useState(false);

  return (
    <div ref={setDroppableRef} className="menu-item-wrapper">
      <div
        className="menu-item-main-div"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
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

        {children.length > 0 && open && (
          <div className="menu-item-children">
            <NestedMenuList items={children} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedMenuItem;
