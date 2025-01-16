import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import "./NestedMenuHeader.css";

const NestedMenuHeader = () => {
  const [open, switchOpen] = useState(false);
  return (
    <div className="main-header-div">
      <button className="header-button" onClick={() => switchOpen(!open)}>
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
