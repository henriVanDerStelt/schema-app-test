import { useState, useEffect, useRef, type JSX } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Sluit menu als ergens buiten geklikt wordt, maar niet op hamburger
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
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

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <a href="/schema-app-test/" className="logo">
        <h2>
          <span className="funky">Workout</span>{" "}
          <span className="normal">tracker</span>
        </h2>
      </a>

      <button
        ref={hamburgerRef}
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div ref={menuRef} className={`links ${isOpen ? "open" : ""}`}>
        <SignedIn>
          <Link to="/schema-app-test/" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/schema-app-test/schedules" onClick={handleLinkClick}>
            Schedules
          </Link>
          <Link to="/schema-app-test/dashboard" onClick={handleLinkClick}>
            Dashboard
          </Link>
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
