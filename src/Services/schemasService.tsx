import { supabase } from "../supabaseClient";

export async function fetchProgram() {
  const { data, error } = await supabase.from("schemas").select(`
    id, 
    name, 
    schemas_weeks (
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
    )
  `);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}
