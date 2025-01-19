import { Item } from "../types/NestedMenuTypes";

const menuConfig: Item[] = [
  {
    id: "1",
    name: "Item 1",
    icon: "SquareDashed",
    children: [
      {
        id: "2",
        name: "Subitem 1.1",
        icon: "Image",
        children: [],
      },
      {
        id: "3",
        name: "Subitem 1.2",
        icon: "Type",
        children: [],
      },
    ],
  },
];

export default menuConfig;
