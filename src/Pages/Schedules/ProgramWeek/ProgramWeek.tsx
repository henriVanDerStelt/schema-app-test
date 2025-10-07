import "./ProgramWeek.css";
import { type JSX } from "react";
import ProgramDay from "../ProgramDay/ProgramDay";
import { type Week } from "../../../interfaces";

interface Props {
  week: Week;
  onDelete?: (weekId: number) => void;
}

function ProgramWeek({ week, onDelete }: Props): JSX.Element {
  const handleDeleteClick = () => {
    onDelete?.(Number(week.id));
  };

  return (
    <div className="program-view-card">
      <div className="week-header">
        <h3>Week {week.week}</h3>
        <button className="delete-week-btn" onClick={handleDeleteClick}>
          x
        </button>
      </div>

      {week.days.map((day) => (
        <ProgramDay key={day.id} day={day} />
      ))}
    </div>
  );
}

export default ProgramWeek;
