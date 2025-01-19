import { Item, NestedMenuListProps } from "../../../types/NestedMenuTypes";
import NestedMenuItem from "../nestedmenu-Item/NestedMenuItem";

const NestedMenuList: React.FC<NestedMenuListProps> = ({
  items,
  onClickDelete,
  onUpdateName,
}) => {
  return (
    <div>
      {items.map((item: Item) => (
        <NestedMenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          icon={item.icon}
          children={item.children || []}
          onClickDelete={onClickDelete}
          onUpdateName={onUpdateName}
        />
      ))}
    </div>
  );
};

export default NestedMenuList;
