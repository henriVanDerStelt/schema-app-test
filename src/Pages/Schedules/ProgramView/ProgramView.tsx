import { type JSX, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ProgramWeek from "../ProgramWeek/ProgramWeek";
import { type Week } from "../../../interfaces";

function ProgramView(): JSX.Element {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);

      const { data, error } = await supabase.from("schemas_weeks").select(`
        id,
        week,
        schemas_days (
          id,
          day,
          schemas_exercises (
            id,
            name,
            schemas_sets (
              id,
              reps,
              weight,
              rpe
            )
          )
        )
      `);

      if (error) {
        console.error("Supabase error:", error);
        setLoading(false);
        return;
      }

      if (data) {
        console.log("Raw data from Supabase:", data);

        const mappedWeeks: Week[] = data.map((week: any) => ({
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
        }));

        setWeeks(mappedWeeks);
      }

      setLoading(false);
    };

    fetchProgram();
  }, []);

  if (loading) return <div>Loading program...</div>;

  return (
    <div className="program-view-container">
      {weeks.map((week) => (
        <ProgramWeek key={week.id} week={week} />
      ))}
    </div>
  );
}

export default ProgramView;
