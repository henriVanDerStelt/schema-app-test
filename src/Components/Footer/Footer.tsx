import { type JSX } from "react";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/schema-app-test/">Home</a>
        <a href="/schema-app-test/login">Login</a>
        <a href="/schema-app-test/dashboard">Dashboard</a>
      </div>
      <div className="footer-info">
        <p>
          &copy; {new Date().getFullYear()} Workout Tracker. All rights
          reserved.
        </p>
        <p>
          Made by{" "}
          <a
            href="https://github.com/henriVanDerStelt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Henri van der Stelt
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
