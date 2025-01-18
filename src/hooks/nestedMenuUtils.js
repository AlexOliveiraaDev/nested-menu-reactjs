export const addUniqueIds = (items, parentId = "") => {
  return items.map((item, index) => {
    const uniqueId = parentId ? `${parentId}-${index}` : `${index}`;
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
