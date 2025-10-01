import { useState, type JSX } from "react";
import "./Navbar.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2>
        <span>Workout</span> tracker.
      </h2>

      {/* Hamburger knop voor mobiel */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`links ${isOpen ? "open" : ""}`}>
        <Link to="/schema-app-test/">Home</Link>
        <Link to="/schema-app-test/dashboard">Dashboard</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to="/schema-app-test/login">Sign In</Link>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
