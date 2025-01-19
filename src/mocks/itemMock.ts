export const mockItems = [
  {
    name: "Item 1",
    icon: "SquareDashed",
    children: [
      {
        name: "Item 1.1",
        icon: "Image",
        children: [],
      },
      {
        name: "Item 1.2",
        icon: "Type",
        children: [
          {
            name: "Item 1.2.1",
            icon: "SquareDashed",
            children: [],
          },
          {
            name: "Item 1.2.2",
            icon: "Image",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Text",
    icon: "Type",
    children: [],
  },
  {
    name: "Graphics",
    icon: "Image",
    children: [],
  },
];
