import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import "./NestedMenuHeader.css";

const NestedMenuHeader = ({onHeaderClick}) => {
  const [open, switchOpen] = useState(false);
  const handleClick = () => {
    switchOpen(!open);
    onHeaderClick();
  };


  return (
    <div className="main-header-div">
      <button className="header-button" onClick={handleClick}>
        {open ? <ChevronDown /> : <ChevronUp />}
        <span>Layers</span>
        <button
          className="header-add-button"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus />
        </button>
      </button>
    </div>
  );
};

export default NestedMenuHeader;
