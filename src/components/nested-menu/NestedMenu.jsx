import React from "react";
import "./NestedMenu.css";
import { SquarePlus, ChevronDown } from "lucide-react";

function clicked() {
  console.log("clicked");
}
const NestedMenu = () => {
  return (
    <div className="main-div">
      <button className="header-button" onClick={clicked}>
        <ChevronDown />
        <span>Layers</span>
        <button
          className="header-add-button"
          onClick={(e) => e.stopPropagation()}
        >
          <SquarePlus />
        </button>
      </button>
    </div>
  );
};

export default NestedMenu;
