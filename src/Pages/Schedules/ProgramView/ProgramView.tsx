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

      const { data, error } = await supabase.from("Schemas_Weeks").select(`
        id,
        week,
        Schemas_Days (
          id,
          day,
          Schemas_Exercises (
            id,
            name,
            Schemas_Sets (
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
        console.log("Raw data from Supabase:", data); // Debug log

        // Map Supabase response to match your interfaces
        const mappedWeeks: Week[] = data.map((week: any) => ({
          id: week.id,
          week: week.week,
          days: week.Schemas_Days.map((day: any) => ({
            id: day.id,
            day: day.day,
            exercises: day.Schemas_Exercises.map((exercise: any) => ({
              id: exercise.id,
              name: exercise.name,
              sets: exercise.Schemas_Sets.map((set: any) => ({
                id: set.id,
                reps: set.reps,
                weight: set.weight,
                rpe: set.rpe,
              })),
            })),
          })),
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
