# 🌳 Nested Menu React Component

A flexible, customizable nested menu component built with React and TypeScript, featuring drag-and-drop functionality and real-time JSON visualization.

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![DND Kit](https://img.shields.io/badge/-DND_Kit-000000?style=flat-square)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)

![Example Image](public/print.png "Example Title")

[View the nested menu online here](https://nested-menu-alexoliveiraa.netlify.app/)

## ✨ Features

- 🎯 Drag and drop functionality for intuitive item organization
- 🔄 Dynamic nested structure supporting multiple levels
- ✏️ Double-click to edit item names
- 🎨 Customizable styling through CSS variables
- 📊 Real-time JSON structure visualization
- 🎭 Multiple item types (Container, Text, Image)
- 🗑️ Easy item deletion
- 📱 Responsive design
- 🧪 Comprehensive test coverage
- 💪 Full TypeScript support

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/AlexOliveiraaDev/nested-menu-reactjs

# Navigate to project directory
cd nested-menu-reactjs

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

## 💻 Usage

First, create an interface for your menu structure:

```typescript
interface MenuItem {
  name: string;
  icon: string;
  children?: MenuItem[];
}

const menuConfig: MenuItem[] = [
  {
    name: "Container 1",
    icon: "SquareDashed",
    children: [
      {
        name: "Text Item",
        icon: "Type"
      },
      {
        name: "Image Item",
        icon: "Image"
      }
    ]
  }
];
```

Then import and use the component:

```tsx
import NestedMenu from "./components/nested-menu/NestedMenu";
import { MenuItem } from "./types/NestedMenuTypes";

function App() {
  return (
    <div>
      <NestedMenu items={menuConfig} />
    </div>
  );
}
```

## 🧪 Testing

The project includes comprehensive tests using Jest and React Testing Library. Test files cover:

- Component rendering
- User interactions
- Drag and drop functionality
- State management
- Utils functions

Run tests with:

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test -- --watch
```

## 🎨 Customization

### Styling

You can customize the appearance by modifying the CSS variables in your stylesheet:

```css
:root {
  --bg-color: #2c2c2c;
  --bg-color-overlay: #383838;
  --border-color: #444444;
  --text-color: white;
  --bg-color-active: #606060;
  --bg-item-color-selected: #0c8ce9;
  --item-icon-color: #a1a1a1;
  --dropdown-background-color: #1e1e1e;
  --dropdown-background-item-hover: #096ab0;
}
```

### Adding New Item Types

To add new types of items to your menu, you'll need to modify the following TypeScript files:

1. In `NestedMenuItem.tsx`, add your new icon and case:

```tsx
import { SquareDashed, Type, Image, FileText, Link } from "lucide-react";

function setIcon(icon: string): JSX.Element {
  switch (icon) {
    case "SquareDashed":
      return <SquareDashed className="menu-item-icon" />;
    case "Type":
      return <Type className="menu-item-icon" />;
    case "Image":
      return <Image className="menu-item-icon" />;
    // Add new cases here
    case "Document":
      return <FileText className="menu-item-icon" />;
    case "Link":
      return <Link className="menu-item-icon" />;
    default:
      return <SquareDashed className="menu-item-icon" />;
  }
}
```

2. Update the `handleClickDropdown` function in `NestedMenu.tsx`:

```tsx
const handleClickDropdown = (index: number) => {
  toggleDropdown();
  const newId = generateUUID();
  const newItems: Item[] = [
    { name: "New Container", icon: "SquareDashed", id: newId },
    { name: "New Text", icon: "Type", id: newId },
    { name: "New Image", icon: "Image", id: newId },
    { name: "New Document", icon: "Document", id: newId },
    { name: "New Link", icon: "Link", id: newId }
  ];
  if (index >= 0 && index < newItems.length) addItem(newItems[index]);
};
```

## 🛠️ Component Structure

```
nested-menu/
├── types/
│   └── NestedMenuTypes.ts    # TypeScript interfaces
├── components/
│   ├── NestedMenu.tsx        # Main component
│   ├── NestedMenuHeader.tsx  # Header with collapse/expand
│   ├── NestedMenuItem.tsx    # Individual menu item
│   ├── NestedMenuList.tsx    # List container
│   ├── NestedMenuDropdown.tsx# Add item dropdown
│   └── CodeWindow.tsx        # JSON viewer
└── hooks/
    └── nestedMenuUtils.ts    # Utility functions
```

## 📝 Features in Detail

### Drag and Drop

- Items can be dragged to reorder or nest within containers
- Maximum nesting depth of 2 levels
- Visual feedback during drag operations
- Type-safe drag event handling

### Item Management

- Add new items through the + button
- Three item types by default: Container, Text, and Image
- Extensible to support more item types
- Double-click to rename items
- Delete items with the trash icon

### JSON Visualization

- Real-time view of the menu structure
- Syntax-highlighted JSON display
- Toggle view with the { } button

## 🤝 Contributing

Contributions are welcome! Please ensure you:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new features
4. Ensure all tests pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [dnd kit](https://dndkit.com/) for the drag and drop functionality
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [PrismJS](https://prismjs.com/) for code syntax highlighting
- [Jest](https://jestjs.io/) for testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing

---

Made with ❤️ by [Alex Oliveira](https://github.com/AlexOliveiraaDev)
