export interface Item {
  id: string;
  name: string;
  icon: string;
  children?: Item[];
}

export interface NestedMenuProps {
  items: any;
  newItem?: Item;
}

export interface NestedMenuItemProps extends Item {
  onClickDelete: (id: string) => void;
  onUpdateName: (id: string, newName: string) => void;
}

export interface NestedMenuListProps {
  items: Item[];
  onClickDelete: (id: string) => void;
  onUpdateName: (id: string, newName: string) => void;
}

export interface NestedMenuHeaderProps {
  onHeaderClick: () => void;
  onAddClick: () => void;
}

export interface FindResult {
  item: Item;
  path: number[];
}

export interface RemoveResult {
  newItems: Item[];
  removedItem: Item;
}
