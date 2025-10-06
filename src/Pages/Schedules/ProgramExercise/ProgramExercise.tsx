import "./ProgramExercise.css";
import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Set {
  reps: number;
  weight: number;
  rpe: number;
}

interface Props {
  name: string;
  sets: Set[];
}

function ProgramExercise({ name, sets }: Props): JSX.Element {
  const [open, setOpen] = useState(false); // collapse state

  return (
    <div className="program-view-exercise">
      {/* Header with toggle */}
      <div className="exercise-header" onClick={() => setOpen(!open)}>
        <input
          type="text"
          defaultValue={name}
          className="exercise-name-input"
          readOnly
        />
        {open ? (
          <ChevronDown size={16} className="chevron" />
        ) : (
          <ChevronRight size={16} className="chevron" />
        )}
      </div>

      {/* Only show sets if open */}
      {open && (
        <div className="program-view-sets">
          {sets.map((value, idx) => (
            <div key={idx} className="set-row">
              <input
                type="number"
                defaultValue={value.reps}
                className="set-input"
              />
              <p className="set-reps">x</p>
              <input
                type="number"
                defaultValue={value.weight}
                className="set-input"
              />
              <p className="set-rpe"> @ {value.rpe}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgramExercise;
