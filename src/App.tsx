import "./App.css";
import NestedMenu from "./components/nested-menu/NestedMenu.tsx";
import menuConfig from "./config/nested-config.json";

//colors of NestedMenu can be changed in variables in App.css
function App() {
  return (
    <div className="main">
      <NestedMenu items={menuConfig} />
    </div>
  );
}

export default App;
