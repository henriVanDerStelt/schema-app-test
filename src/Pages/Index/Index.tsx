import "./Index.css";
import WorkInProgress from "../../assets/wip.png";

import { type JSX } from "react";

function Index(): JSX.Element {
  return (
    <div className="index">
      <div className="index-content">
        <img src={WorkInProgress} alt="Work in progress" />
        <div className="text">
          <h1>Work in progress...</h1>
          <p>
            <i>
              We're still building the Workout Tracker behind the scenes to give
              you the best possible experience. For now, keep doing your best in
              the gym — progress never waits.
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
