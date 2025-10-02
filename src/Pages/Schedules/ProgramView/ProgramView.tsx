import "./ProgramView.css";

import { type JSX } from "react";
import ProgramWeek from "../ProgramWeek/ProgramWeek";

function ProgramView(): JSX.Element {
  return (
    <div className="program-view-container">
      <ProgramWeek weekNumber={1} />
      <ProgramWeek weekNumber={2} />
      <ProgramWeek weekNumber={3} />
    </div>
  );
}

export default ProgramView;
