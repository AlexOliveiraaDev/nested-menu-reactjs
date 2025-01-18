import { useState } from "react";

export const useAddItemsNestedMenu = (initialItems) => {
  const [data, setData] = useState(initialItems);

  const generateUniqueId = (parentId = null) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return parentId
      ? `${parentId}-${timestamp}-${random}`
      : `${timestamp}-${random}`;
  };

  const findItemById = (items, targetId) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === targetId) {
        return items[i];
      }
      if (items[i].children?.length > 0) {
        const found = findItemById(items[i].children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // the new item is added to the root level
  const addItem = ({ name, icon }) => {
    const newItem = {
      id: generateUniqueId(),
      name,
      icon,
      children: [],
    };

    setData((prevData) => [...prevData, newItem]);
  };

  const addItemChild = ({ parentId, name, icon }) => {
    setData((prevData) => {
      const newData = [...prevData];
      const newItem = {
        id: generateUniqueId(parentId),
        name,
        icon,
        children: [],
      };

      const addChildToParent = (items) => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...item.children, newItem],
            };
          }
          if (item.children?.length > 0) {
            return {
              ...item,
              children: addChildToParent(item.children),
            };
          }
          return item;
        });
      };

      return addChildToParent(newData);
    });
  };

  const removeItem = (itemId) => {
    setData((prevData) => {
      const removeItemById = (items) => {
        return items.filter((item) => {
          if (item.id === itemId) {
            return false;
          }
          if (item.children?.length > 0) {
            item.children = removeItemById(item.children);
          }
          return true;
        });
      };

      return removeItemById(prevData);
    });
  };

  const updateItem = (itemId, updates) => {
    setData((prevData) => {
      const updateItemById = (items) => {
        return items.map((item) => {
          if (item.id === itemId) {
            return { ...item, ...updates };
          }
          if (item.children?.length > 0) {
            return {
              ...item,
              children: updateItemById(item.children),
            };
          }
          return item;
        });
      };

      return updateItemById(prevData);
    });
  };

  return {
    data,
    setData,
    addItem,
    addItemChild,
    removeItem,
    updateItem,
    findItemById,
  };
};
