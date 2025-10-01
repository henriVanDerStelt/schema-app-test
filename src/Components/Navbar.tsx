import "./Navbar.css";

import { type JSX } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar(): JSX.Element {
  return (
    <div className="navbar">
      <h2>
        <span>Workout</span> tracker.
      </h2>
      <div className="links">
        <a href="/schema-app-test/">Home</a>
        <a href="/schema-app-test/dashboard">Dashboard</a>
      </div>
      <div className="user-section">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <a href="/schema-app-test/login">Sign In</a>
        </SignedOut>
      </div>
    </div>
  );
}

export default Navbar;
