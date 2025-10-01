import { useState, useEffect, useRef, type JSX } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sluit menu als ergens buiten geklikt wordt
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Sluit menu bij link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <h2>
        <span>Workout</span> tracker.
      </h2>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div ref={menuRef} className={`links ${isOpen ? "open" : ""}`}>
        <Link to="/schema-app-test/" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/schema-app-test/dashboard" onClick={handleLinkClick}>
          Dashboard
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to="/schema-app-test/login" onClick={handleLinkClick}>
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
