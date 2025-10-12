import "./OverflowMenu.css";

import { type JSX, useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

type OverflowOption = { label: string; action: () => void } | { divider: true };

interface Props {
  options: OverflowOption[];
}

function OverflowMenu({ options }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties | undefined>(
    undefined
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // place menu below the button, align left edge with button's left edge
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
      });
    } else {
      setMenuStyle(undefined);
    }
  }, [isOpen]);

  return (
    <div className="overflow-menu" ref={menuRef}>
      <button
        ref={buttonRef}
        className="overflow-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="More options"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="overflow-menu-content" style={menuStyle}>
          {options.map((option, index) =>
            "divider" in option ? (
              <div key={index} className="overflow-menu-divider" />
            ) : (
              <button
                key={index}
                className="overflow-menu-option"
                onClick={option.action}
              >
                {option.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default OverflowMenu;
