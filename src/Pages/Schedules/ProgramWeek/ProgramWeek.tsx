import "./ProgramWeek.css";

import { type JSX } from "react";
import ProgramDay from "../ProgramDay/ProgramDay";
import { type Week } from "../../../interfaces";

interface Props {
  week: Week;
}

function ProgramWeek({ week }: Props): JSX.Element {
  return (
    <div className="program-view-card">
      <h3>Week {week.week}</h3>
      {week.days.map((day) => (
        <ProgramDay key={day.id} day={day} />
      ))}
    </div>
  );
}

export default ProgramWeek;
