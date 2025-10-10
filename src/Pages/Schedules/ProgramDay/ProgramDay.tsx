import { type JSX, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ProgramExercise from "../ProgramExercise/ProgramExercise";
import "./ProgramDay.css";
import { type Day } from "../../../interfaces";
import { deleteDay } from "../../../Services/schemasDaysService";
import { addExercise } from "../../../Services/schemasExercisesService";
import { addSet, deleteSet } from "../../../Services/schemasSetsService";

interface Props {
  day: Day;
  onDeleteDay?: (dayId: number) => void;
  onAddExercise?: (dayId: number, newExercise: any) => void;
  onDeleteExercise?: (dayId: number, exerciseId: number) => void;
  onUpdateDay?: (dayId: number, updatedExercises: any[]) => void;
}

function ProgramDay({
  day,
  onDeleteDay,
  onAddExercise,
  onUpdateDay,
}: Props): JSX.Element {
  const [open, setOpen] = useState(true);

  const handleDeleteDay = async () => {
    try {
      await deleteDay(Number(day.id));
      onDeleteDay?.(Number(day.id));
    } catch (error) {
      console.error("Error deleting day:", error);
    }
  };

  const handleAddExercise = async () => {
    try {
      const newExerciseName = "New Exercise";
      const newExercise = await addExercise(Number(day.id), newExerciseName);
      onAddExercise?.(Number(day.id), newExercise[0]);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const handleAddSet = async (exerciseId: string) => {
    try {
      const newSet = await addSet(exerciseId, 10, 50, 8);

      onUpdateDay?.(
        Number(day.id),
        day.exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, sets: [...ex.sets, newSet[0]] } : ex
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSet = async (exerciseId: number, setId: number) => {
    try {
      await deleteSet(setId);

      onUpdateDay?.(
        Number(day.id),
        day.exercises.map((ex) =>
          Number(ex.id) === exerciseId
            ? { ...ex, sets: ex.sets.filter((s) => Number(s.id) !== setId) }
            : ex
        )
      );
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
            className="delete-day-btn"
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
              onAddSet={() => handleAddSet(exercise.id)}
              onDeleteSet={(setId) =>
                handleDeleteSet(Number(exercise.id), setId)
              }
            />
          ))}

          <button className="add-exercise-btn" onClick={handleAddExercise}>
            + Exercise
          </button>
        </>
      )}
    </div>
  );
}

export default ProgramDay;
