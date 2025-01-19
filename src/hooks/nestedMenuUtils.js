export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const addUniqueIds = (items, parentId = "") => {
  return items.map((item, index) => {
    const uniqueId = generateUUID();
    return {
      ...item,
      id: uniqueId,
      children: item.children ? addUniqueIds(item.children, uniqueId) : [],
    };
  });
};

export const findItemById = (items, targetId) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === targetId) {
      return { item: items[i], path: [i] };
    }

    if (items[i].children) {
      const result = findItemById(items[i].children, targetId);
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

export const removeItemAtPath = (items, path) => {
  const newItems = [...items];
  let current = newItems;

  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]].children;
  }

  const removedItem = current[path[path.length - 1]];
  current.splice(path[path.length - 1], 1);
  return { newItems, removedItem };
};

export const removeItemById = (items, targetId) => {
  const result = findItemById(items, targetId);
  if (result) return removeItemAtPath(items, result.path);
};

export const addItemToPath = (items, item, targetId) => {
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

export const updateItemName = (items, itemId, newName) => {
  const newItems = [...items];
  const target = findItemById(newItems, itemId);

  if (target) {
    let current = newItems;
    const path = target.path;

    // Navigate to the parent of the target item
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children;
    }

    // Update the name of the target item
    current[path[path.length - 1]] = {
      ...current[path[path.length - 1]],
      name: newName,
    };
  }

  return newItems;
};
