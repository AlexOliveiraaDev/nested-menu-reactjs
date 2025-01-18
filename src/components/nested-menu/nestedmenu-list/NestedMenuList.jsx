import React from "react";
import NestedMenuItem from "../nestedmenu-Item/NestedMenuItem";

const NestedMenuList = ({ items, onClickDelete }) => {
  return (
    <div>
      {items.map((item) => (
        <NestedMenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          icon={item.icon}
          children={item.children || []}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
};

export default NestedMenuList;
