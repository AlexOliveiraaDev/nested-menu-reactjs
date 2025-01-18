import { useState } from "react";
import "./App.css";
import NestedMenu from "./components/nested-menu/NestedMenu.jsx";
import items from "/src/config/nested-config.json" ;



function App() {
  return (
    <div className="main">
      <NestedMenu items={items} />
    </div>
  );
}

export default App;
