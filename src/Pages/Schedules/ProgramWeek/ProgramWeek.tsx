import "./ProgramWeek.css";

import { type JSX } from "react";
import ProgramDay from "../ProgramDay/ProgramDay";

interface Props {
  weekNumber: number;
}

function ProgramWeek({ weekNumber }: Props): JSX.Element {
  return (
    <div className="program-view-card">
      <h3>Week {weekNumber}</h3>
      <ProgramDay dayNumber={1} />
      <ProgramDay dayNumber={2} />
      <ProgramDay dayNumber={3} />
    </div>
  );
}

export default ProgramWeek;
