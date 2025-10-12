import "./ProgramWeek.css";
import { type JSX } from "react";
import ProgramDay from "../ProgramDay/ProgramDay";
import { type Week } from "../../../interfaces";
import { addDay } from "../../../Services/schemasDaysService";

interface Props {
  week: Week;
  onDelete?: (weekId: number) => void;
  onAddDay?: (weekId: number, newDay: any) => void;
  onDeleteDay?: (weekId: number, dayId: number) => void;
  onAddExercise?: (weekId: number, dayId: number, newExercise: any) => void;
  onDeleteExercise?: (
    weekId: number,
    dayId: number,
    exerciseId: number
  ) => void;
  onUpdateDay?: (dayId: number, updatedExercises: any[]) => void;
}

function ProgramWeek({
  week,
  onDelete,
  onAddDay,
  onDeleteDay,
  onAddExercise,
  onDeleteExercise,
  onUpdateDay,
}: Props): JSX.Element {
  const handleDeleteClick = () => {
    onDelete?.(Number(week.id));
  };

  const handleAddDay = async () => {
    try {
      const newDayNumber = (week.days?.length ?? 0) + 1;
      const newDay = await addDay(Number(week.id), newDayNumber);
      onAddDay?.(Number(week.id), newDay[0]);
    } catch (error) {
      console.error("Error adding day:", error);
    }
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
        <ProgramDay
          key={day.id}
          day={day}
          onDeleteDay={(dayId) => onDeleteDay?.(Number(week.id), dayId)}
          onAddExercise={(dayId, newExercise) =>
            onAddExercise?.(Number(week.id), dayId, newExercise)
          }
          onDeleteExercise={(dayId, exerciseId) =>
            onDeleteExercise?.(Number(week.id), dayId, exerciseId)
          }
          onUpdateDay={onUpdateDay}
        />
      ))}
      <button className="add-day-btn" onClick={handleAddDay}>
        + Day
      </button>
    </div>
  );
}

export default ProgramWeek;
