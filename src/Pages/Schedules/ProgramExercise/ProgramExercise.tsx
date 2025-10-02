import "./ProgramExercise.css";
import { type JSX } from "react";

interface Props {
  name: string;
  sets: number[];
}

function ProgramExercise({ name, sets }: Props): JSX.Element {
  return (
    <div className="program-view-exercise">
      <input type="text" defaultValue={name} className="exercise-name-input" />
      <div className="program-view-sets">
        {sets.map((value, idx) => (
          <input
            key={idx}
            type="number"
            defaultValue={value}
            className="set-input"
          />
        ))}
      </div>
    </div>
  );
}

export default ProgramExercise;
