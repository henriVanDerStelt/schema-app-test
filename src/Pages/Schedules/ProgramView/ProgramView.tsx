import { type JSX } from "react";
import ProgramWeek from "../ProgramWeek/ProgramWeek";
import { type Week } from "../../../interfaces";

interface ProgramViewProps {
  program: any;
  onDeleteWeek: (weekId: number) => void;
}

function ProgramView({ program, onDeleteWeek }: ProgramViewProps): JSX.Element {
  const mappedWeeks: Week[] =
    program.schemas_weeks?.map((week: any) => ({
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
    })) ?? [];

  return (
    <div className="program-view-container">
      {mappedWeeks.map((week) => (
        <ProgramWeek key={week.id} week={week} onDelete={onDeleteWeek} />
      ))}
    </div>
  );
}

export default ProgramView;
