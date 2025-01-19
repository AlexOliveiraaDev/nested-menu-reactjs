import { SquareDashed, Type, Image } from "lucide-react";
import "./NestedMenuDropdown.css";

const NestedMenuDropdown = ({ onClick }: { onClick: (index: number) => void }) => {
  return (
    <div className="main-dropdown-div">
      <div
        className="dropdown-row"
        onClick={() => onClick(0)}
      >
        <SquareDashed />
        <span>Container</span>
      </div>

      <div
        className="dropdown-row"
        onClick={() => onClick(1)}
      >
        <Type />
        <span>Text</span>
      </div>

      <div
        className="dropdown-row"
        onClick={() => onClick(2)}
      >
        <Image />
        <span>Image</span>
      </div>
    </div>
  );
};

export default NestedMenuDropdown;
