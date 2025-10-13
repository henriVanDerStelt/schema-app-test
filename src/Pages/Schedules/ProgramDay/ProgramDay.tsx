import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ProgramExercise from "../ProgramExercise/ProgramExercise";
import "./ProgramDay.css";
import { type Day } from "../../../interfaces";
import { deleteDay } from "../../../Services/schemasDaysService";
import {
  addExercise,
  deleteExercise,
} from "../../../Services/schemasExercisesService";
import { addSet, deleteSet } from "../../../Services/schemasSetsService";
import Popup from "../../../Components/Popup/Popup";

interface Props {
  day: Day;
  onDeleteDay?: (dayId: number) => void;
  onAddExercise?: (dayId: number, newExercise: any) => void;
  onDeleteExercise?: (dayId: number, exerciseId: number) => void;
  onAddSet?: (
    exerciseId: string,
    reps: number,
    weight: number,
    rpe: number
  ) => void;
  onUpdateDay?: (dayId: number, updatedExercises: any[]) => void;
}

function ProgramDay({
  day,
  onDeleteDay,
  onAddExercise,
  onDeleteExercise,
  onUpdateDay,
}: Props): JSX.Element {
  const [open, setOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");

  const handleDeleteDay = async () => {
    try {
      await deleteDay(Number(day.id));
      onDeleteDay?.(Number(day.id));
    } catch (error) {
      console.error("Error deleting day:", error);
    }
  };

  const openAddExercisePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewExerciseName("");
    setIsPopupOpen(true);
  };

  const confirmAddExercise = async () => {
    const name = newExerciseName.trim();
    if (!name) return;
    try {
      const newExercise = await addExercise(Number(day.id), name);
      onAddExercise?.(Number(day.id), newExercise[0]);
      setIsPopupOpen(false);
      setNewExerciseName("");
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  // new signature: callers will pass reps, weight, rpe
  const handleAddSetWithValues = async (
    exerciseId: string,
    reps: number,
    weight: number,
    rpe: number
  ) => {
    try {
      const newSet = await addSet(exerciseId, reps, weight, rpe);

      const updatedExercises = day.exercises.map((ex) =>
        String(ex.id) === String(exerciseId)
          ? {
              id: ex.id,
              name: ex.name,
              schemas_sets: [...(ex.sets ?? []), newSet[0]],
            }
          : { id: ex.id, name: ex.name, schemas_sets: ex.sets ?? [] }
      );

      onUpdateDay?.(Number(day.id), updatedExercises);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    try {
      await deleteExercise(exerciseId);

      // inform parent to update local UI state
      onDeleteExercise?.(Number(day.id), exerciseId);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handleDeleteSet = async (exerciseId: number, setId: number) => {
    try {
      await deleteSet(setId);

      const updatedExercises = day.exercises.map((ex) =>
        Number(ex.id) === Number(exerciseId)
          ? {
              id: ex.id,
              name: ex.name,
              schemas_sets: (ex.sets ?? []).filter(
                (s) => Number(s.id) !== setId
              ),
            }
          : { id: ex.id, name: ex.name, schemas_sets: ex.sets ?? [] }
      );

      onUpdateDay?.(Number(day.id), updatedExercises);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="program-view-day">
      <div className="program-day-header" onClick={() => setOpen(!open)}>
        <h4 className="program-day-title">Day {day.day}</h4>
        <div className="day-buttons">
          <button
            className="delete-day-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDay();
            }}
          >
            ×
          </button>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </div>
      </div>

      {open && (
        <>
          <div className="divider" />
          {day.exercises.map((exercise) => (
            <ProgramExercise
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets} // <- just pass the array directly
              onAddSet={(reps, weight, rpe) =>
                handleAddSetWithValues(exercise.id, reps, weight, rpe)
              }
              onDeleteSet={(setId) =>
                handleDeleteSet(Number(exercise.id), setId)
              }
              onDeleteExercise={() => handleDeleteExercise(Number(exercise.id))}
            />
          ))}

          <button
            className="add-exercise-btn"
            onClick={(e) =>
              openAddExercisePopup(e as unknown as React.MouseEvent)
            }
          >
            + Exercise
          </button>

          {isPopupOpen && (
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label>Exercise name</label>
                <input
                  autoFocus
                  type="text"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
                  <button
                    onClick={confirmAddExercise}
                    disabled={newExerciseName.trim() === ""}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </>
      )}
    </div>
  );
}

export default ProgramDay;
