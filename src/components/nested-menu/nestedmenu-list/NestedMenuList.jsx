import React from "react";
import NestedMenuItem from "../nestedmenu-Item/NestedMenuItem";

const NestedMenuList = ({ items }) => {
  return (
    <div>
      {items.map(({ name, icon, children }, index) => (
        <NestedMenuItem
          key={index}
          id={index}
          name={name}
          icon={icon}
          children={children}
        />
      ))}
    </div>
  );
};

export default NestedMenuList;
