import React, { useState, useRef } from "react";
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

const NestedMenuItem = ({
  id,
  name,
  icon,
  children,
  onClickDelete,
  onUpdateName,
}) => {
  const { setNodeRef: setDroppableRef } = useDroppable({ id: id });
  const [open, switchOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleTextClick = () => {
    console.log("Texto clicado");
    setIsEditing(true); // Altera o estado.
  };

  const handleUpdateName = () => {
    setIsEditing(false);
    if (newName === name) return;
    onUpdateName(id, newName);
  };

  const [newName, setNewName] = useState(name);

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
          {isEditing ? (
            <input
              autoFocus
              className="menu-item-input"
              type="text"
              value={newName}
              onBlur={handleUpdateName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdateName();
                }
              }}
            />
          ) : (
            <span onDoubleClick={handleTextClick}>{name}</span>
          )}

          <div
            onClick={(e) => {
              e.stopPropagation();
              onClickDelete(id);
            }}
          >
            <Trash2 className="menu-item-icon menu-item-delete" />
          </div>
        </div>

        {children.length > 0 && open && (
          <div className="menu-item-children">
            <NestedMenuList
              items={children}
              onClickDelete={onClickDelete}
              onUpdateName={onUpdateName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedMenuItem;
