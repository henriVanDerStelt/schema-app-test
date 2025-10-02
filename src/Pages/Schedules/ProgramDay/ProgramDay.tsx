import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ProgramExercise from "../ProgramExercise/ProgramExercise";
import "./ProgramDay.css";

interface Props {
  dayNumber: number;
}

function ProgramDay({ dayNumber }: Props): JSX.Element {
  const [open, setOpen] = useState(true);

  return (
    <div className="program-view-day">
      <div className="program-day-header" onClick={() => setOpen(!open)}>
        <h4 className="program-day-title">Day {dayNumber}</h4>
        {open ? (
          <ChevronDown size={12} className="chevron" />
        ) : (
          <ChevronRight size={12} className="chevron" />
        )}
      </div>

      {open && (
        <>
          <div className="divider" />
          <ProgramExercise name="Bench press" sets={[10, 10, 10]} />
          <ProgramExercise name="Squat" sets={[5, 5, 5]} />
          <ProgramExercise name="Deadlift" sets={[3, 3, 3]} />
        </>
      )}
    </div>
  );
}

export default ProgramDay;
