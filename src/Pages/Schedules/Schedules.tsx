import "./Schedules.css";

import { type JSX } from "react";
import SchedulesNavbar from "../../Components/SchedulesNavbar/SchedulesNavbar";

function Schedules(): JSX.Element {
  return (
    <>
      <SchedulesNavbar />
      <div className="schedules-page">
        <header className="schedules-header">
          <h1>Schedules</h1>
          <p>Plan your workouts for the upcoming weeks and stay on track!</p>
        </header>

        {/* Mock schedule cards */}
        <div className="mock-schedules">
          <div className="schedule-card">
            <h2>Week 1</h2>
            <ul>
              <li>Day 1: Chest & Triceps</li>
              <li>Day 2: Back & Biceps</li>
              <li>Day 3: Legs</li>
            </ul>
          </div>

          <div className="schedule-card">
            <h2>Week 2</h2>
            <ul>
              <li>Day 1: Chest & Shoulders</li>
              <li>Day 2: Back & Legs</li>
              <li>Day 3: Arms & Core</li>
            </ul>
          </div>

          <div className="schedule-card">
            <h2>Week 3</h2>
            <ul>
              <li>Day 1: Full Body</li>
              <li>Day 2: Cardio & Core</li>
              <li>Day 3: Rest / Mobility</li>
            </ul>
          </div>

          <div className="schedule-card">
            <h2>Week 4</h2>
            <ul>
              <li>Day 1: Chest & Triceps</li>
              <li>Day 2: Back & Biceps</li>
              <li>Day 3: Legs</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedules;
