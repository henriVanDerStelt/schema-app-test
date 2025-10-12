import "./Popup.css";
import { type JSX, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

function Popup({ isOpen, onClose, children }: Props): JSX.Element | null {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
