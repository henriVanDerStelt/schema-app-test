import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ProgramExercise from "../ProgramExercise/ProgramExercise";
import "./ProgramDay.css";
import { type Day } from "../../../interfaces";

interface Props {
  day: Day;
}

function ProgramDay({ day }: Props): JSX.Element {
  const [open, setOpen] = useState(true);

  return (
    <div className="program-view-day">
      <div className="program-day-header" onClick={() => setOpen(!open)}>
        <h4 className="program-day-title">Day {day.day}</h4>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </div>

      {open && (
        <>
          <div className="divider" />
          {day.exercises.map((exercise) => (
            <ProgramExercise
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ProgramDay;
