import "./ProgramExercise.css";
import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Popup from "../../../Components/Popup/Popup";
import OverflowMenu from "../../../Components/OverflowMenu/OverflowMenu";

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
  onAddSet?: (reps: number, weight: number, rpe: number) => void;
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
  const [isAddSetOpen, setIsAddSetOpen] = useState(false);
  const [newReps, setNewReps] = useState<number>(10);
  const [newWeight, setNewWeight] = useState<number>(50);
  const [newRpe, setNewRpe] = useState<number>(8);
  const [showPercentage, setShowPercentage] = useState(false);
  const [showRpe, setShowRpe] = useState(true);
  const toggleShowPercentage = () => {
    setShowPercentage((prev) => {
      const next = !prev;
      if (next) setShowRpe(false);
      return next;
    });
  };

  const toggleShowRpe = () => {
    setShowRpe((prev) => {
      const next = !prev;
      if (next) setShowPercentage(false);
      return next;
    });
  };

  return (
    <div className="program-view-exercise">
      {/* Header with toggle */}
      <div className="exercise-header" onClick={() => setOpen(!open)}>
        <div className="exercise-left">
          <p className="exercise-name" title={name}>
            {name}
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            <OverflowMenu
              options={[
                {
                  label: showPercentage ? "Hide percentage" : "Show percentage",
                  action: toggleShowPercentage,
                },
                {
                  label: showRpe ? "Hide RPE" : "Show RPE",
                  action: toggleShowRpe,
                },
                { divider: true },
                { label: "Rename", action: () => console.log("rename (todo)") },
                { label: "Delete", action: () => onDeleteExercise?.() },
              ]}
            />
          </div>
        </div>

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
          <button
            className="add-set-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddSetOpen(true);
            }}
          >
            + Set
          </button>

          {isAddSetOpen && (
            <Popup isOpen={isAddSetOpen} onClose={() => setIsAddSetOpen(false)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label>Reps</label>
                <input
                  type="number"
                  value={newReps}
                  onChange={(e) => setNewReps(Number(e.target.value))}
                />
                <label>Weight</label>
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                />
                <label>RPE</label>
                <input
                  type="number"
                  value={newRpe}
                  onChange={(e) => setNewRpe(Number(e.target.value))}
                />

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button onClick={() => setIsAddSetOpen(false)}>Cancel</button>
                  <button
                    onClick={() => {
                      onAddSet?.(newReps, newWeight, newRpe);
                      setIsAddSetOpen(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgramExercise;
