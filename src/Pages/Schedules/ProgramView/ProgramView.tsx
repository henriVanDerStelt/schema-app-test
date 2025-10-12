import { type JSX } from "react";
import ProgramWeek from "../ProgramWeek/ProgramWeek";
import "./ProgramView.css";

interface ProgramViewProps {
  program: any;
  onDeleteWeek: (weekId: number) => void;
  onUpdateProgram: (updatedProgram: any) => void;
}

function ProgramView({
  program,
  onDeleteWeek,
  onUpdateProgram,
}: ProgramViewProps): JSX.Element {
  const handleAddDay = (weekId: number, newDay: any) => {
    const updatedWeeks = program.schemas_weeks.map((week: any) =>
      week.id === weekId
        ? { ...week, schemas_days: [...(week.schemas_days ?? []), newDay] }
        : week
    );

    // update direct de parent state
    onUpdateProgram({ ...program, schemas_weeks: updatedWeeks });
  };

  const handleDeleteDay = (weekId: number, dayId: number) => {
    const updatedWeeks = program.schemas_weeks.map((week: any) =>
      week.id === weekId
        ? {
            ...week,
            schemas_days: week.schemas_days.filter(
              (day: any) => Number(day.id) !== Number(dayId)
            ),
          }
        : week
    );

    onUpdateProgram({ ...program, schemas_weeks: updatedWeeks });
  };

  const handleAddExercise = (
    weekId: number,
    dayId: number,
    newExercise: any
  ) => {
    const updatedWeeks = program.schemas_weeks.map((week: any) =>
      week.id === weekId
        ? {
            ...week,
            schemas_days: week.schemas_days.map((day: any) =>
              day.id === dayId
                ? {
                    ...day,
                    schemas_exercises: [
                      ...(day.schemas_exercises ?? []),
                      newExercise,
                    ],
                  }
                : day
            ),
          }
        : week
    );

    onUpdateProgram({ ...program, schemas_weeks: updatedWeeks });
  };

  const handleDeleteExercise = (
    weekId: number,
    dayId: number,
    exerciseId: number
  ) => {
    const updatedWeeks = program.schemas_weeks.map((week: any) =>
      week.id === weekId
        ? {
            ...week,
            schemas_days: week.schemas_days.map((day: any) =>
              day.id === dayId
                ? {
                    ...day,
                    schemas_exercises: day.schemas_exercises.filter(
                      (ex: any) => Number(ex.id) !== Number(exerciseId)
                    ),
                  }
                : day
            ),
          }
        : week
    );

    onUpdateProgram({ ...program, schemas_weeks: updatedWeeks });
  };

  const handleUpdateDay = (dayId: number, updatedExercises: any[]) => {
    const updatedWeeks = program.schemas_weeks.map((week: any) => ({
      ...week,
      schemas_days: week.schemas_days.map((day: any) =>
        day.id === dayId ? { ...day, schemas_exercises: updatedExercises } : day
      ),
    }));

    onUpdateProgram({ ...program, schemas_weeks: updatedWeeks });
  };

  return (
    <div className="program-view-container">
      {program.schemas_weeks?.map((week: any) => (
        <ProgramWeek
          key={week.id}
          week={{
            id: week.id,
            week: week.week,
            days:
              week.schemas_days?.map((day: any) => ({
                id: day.id,
                day: day.day,
                exercises:
                  day.schemas_exercises?.map((exercise: any) => ({
                    id: exercise.id,
                    name: exercise.name,
                    sets:
                      exercise.schemas_sets?.map((set: any) => ({
                        id: set.id,
                        reps: set.reps,
                        weight: set.weight,
                        rpe: set.rpe,
                      })) ?? [],
                  })) ?? [],
              })) ?? [],
          }}
          onDelete={onDeleteWeek}
          onAddDay={handleAddDay}
          onDeleteDay={handleDeleteDay}
          onAddExercise={handleAddExercise}
          onDeleteExercise={handleDeleteExercise}
          onUpdateDay={handleUpdateDay}
        />
      ))}
    </div>
  );
}

export default ProgramView;
