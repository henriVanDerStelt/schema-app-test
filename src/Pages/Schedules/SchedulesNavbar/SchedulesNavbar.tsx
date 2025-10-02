import "./SchedulesNavbar.css";
import { type JSX } from "react";

function SchedulesNavbar(): JSX.Element {
  return (
    <div className="schedules-navbar">
      <div className="path-indicator">
        <a href="/schema-app-test/" className="logo">
          Bench Behemoth
        </a>
        <a href="/schema-app-test/" className="logo">
          Week 1
        </a>
        <a href="/schema-app-test/" className="logo">
          Day 3
        </a>
      </div>

      <div className="actions">
        <button className="add-workout">+</button>
        <button className="start">Start</button>
      </div>
    </div>
  );
}

export default SchedulesNavbar;
