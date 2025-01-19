import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import "./NestedMenuHeader.css";

const NestedMenuHeader = ({ onHeaderClick, onAddClick }) => {
  const [open, switchOpen] = useState(false);

  // Send a callback to NestedMenu and flip the header state
  const handleClick = () => {
    switchOpen(!open);
    onHeaderClick();
  };

  return (
    <div className="main-header-div">
      <div className="header-button" onClick={handleClick}>
        {open ? <ChevronDown /> : <ChevronUp />}
        <span>Layers</span>

        {/*The StopPropagation prevents header-button from being clicked */}
        <button
          className="header-add-button"
          onClick={(e) => {
            e.stopPropagation();
            onAddClick();
          }}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default NestedMenuHeader;
