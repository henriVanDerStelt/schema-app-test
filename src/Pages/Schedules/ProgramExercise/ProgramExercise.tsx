import "./ProgramExercise.css";
import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Set {
  id: string;
  reps: number;
  weight: number;
  rpe: number;
}

interface Props {
  name: string;
  sets: Set[];
  onDeleteExercise?: () => void;
  onAddSet?: () => void;
  onDeleteSet?: (setId: number) => void;
}

function ProgramExercise({
  name,
  sets,
  onDeleteExercise,
  onAddSet,
  onDeleteSet,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);

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
        <button
          className="delete-exercise-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteExercise?.();
          }}
        >
          ×
        </button>
        {open ? (
          <ChevronDown size={16} className="chevron" />
        ) : (
          <ChevronRight size={16} className="chevron" />
        )}
      </div>

      {/* Only show sets if open */}
      {open && (
        <div className="program-view-sets">
          {sets.map((value) => (
            <div key={value.id} className="set-row">
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
              <button
                className="delete-set-btn"
                onClick={() => onDeleteSet?.(Number(value.id))}
              >
                ×
              </button>
            </div>
          ))}
          <button className="add-set-btn" onClick={onAddSet}>
            + Set
          </button>
        </div>
      )}
    </div>
  );
}

export default ProgramExercise;
