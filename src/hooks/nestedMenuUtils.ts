import { Item, FindResult, RemoveResult } from "../types/NestedMenuTypes";

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const addUniqueIds = (items: Item[]): Item[] => {
  return items.map((item: Item) => {
    const uniqueId = generateUUID();
    return {
      ...item,
      id: uniqueId,
      children: item.children ? addUniqueIds(item.children) : [],
    };
  });
};

export const findItemById = (items: Item[], targetId: string): FindResult | null => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === targetId) {
      return { item: items[i], path: [i] };
    }
    if (items[i].children) {
      const result = findItemById(items[i].children!, targetId);
      if (result) {
        return {
          item: result.item,
          path: [i, ...result.path],
        };
      }
    }
  }
  return null;
};

export const removeItemAtPath = (items: Item[], path: number[]): RemoveResult => {
  const newItems = [...items];
  let current = newItems;

  for (let i = 0; i < path.length - 1; i++) {
    const nextCurrent = current[path[i]]?.children;
    if (!nextCurrent) {
      throw new Error("Invalid path");
    }
    current = nextCurrent;
  }

  const removedItem = current[path[path.length - 1]];
  current.splice(path[path.length - 1], 1);
  return { newItems, removedItem };
};

export const removeItemById = (items: Item[], targetId: string) => {
  const result = findItemById(items, targetId);
  if (result) return removeItemAtPath(items, result.path);
};

export const getItemDepth = (items: Item[], targetId: string) => {
  const result = findItemById(items, targetId);
  return result ? result.path.length - 1 : 0;
};

export const addItemToPath = (items: Item[], item: Item, targetId: string) => {
  const newItems = [...items];
  const target = findItemById(newItems, targetId);

  if (target) {
    if (!target.item.children) {
      target.item.children = [];
    }
    target.item.children.push(item);
  }

  return newItems;
};

export const updateItemName = (items: Item[], itemId: string, newName: string) => {
  const newItems = [...items];
  const target = findItemById(newItems, itemId);

  if (target) {
    let current = newItems;
    const path = target.path;

    for (let i = 0; i < path.length - 1; i++) {
      const nextCurrent = current[path[i]]?.children;
      if (!nextCurrent) {
        throw new Error("Invalid path");
      }
      current = nextCurrent;
    }

    current[path[path.length - 1]] = {
      ...current[path[path.length - 1]],
      name: newName,
    };
  }

  return newItems;
};
