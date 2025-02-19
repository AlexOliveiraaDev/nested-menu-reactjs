import { useEffect } from "react";
import "./CodeWindow.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";
import { X } from "lucide-react";

const CodeWindow = ({ code, onClose }: { code: string; onClose: () => void }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <button
        onClick={onClose}
        className="close-button"
      >
        <X />
      </button>
      <h1>JSON</h1>
      <pre className="code-window-main">
        <code className="language-json">{code}</code>
      </pre>
    </div>
  );
};

export default CodeWindow;
