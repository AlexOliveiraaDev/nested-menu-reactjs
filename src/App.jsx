import { useState } from "react";
import "./App.css";
import NestedMenu from "./components/nested-menu/NestedMenu.jsx";
import items from "/src/config/nested-config.json";
import test1 from "/src/config/test1.json";
import test2 from "/src/config/test2.json";
import test3 from "/src/config/test3.json";
import test4 from "/src/config/test4.json";
import test5 from "/src/config/test5.json";

function App() {
  return (
    <div className="main">
      <NestedMenu items={test5} />
    </div>
  );
}

export default App;
