import { supabase } from "../supabaseClient";

/**
 * Voeg een nieuwe exercise toe aan een bestaand week
 * @param dayId - het ID van het week (foreign key)
 * @param exerciseNumber - het exercisenummer (bijv. 11)
 */
export async function addExercise(dayId: number, name: string) {
  const { data, error } = await supabase
    .from("schemas_exercises")
    .insert([{ name: name, day: dayId }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}

/**
 * Verwijdert een exercise uit de database op basis van ID.
 * @param exerciseId - Het ID van de exercise die je wilt verwijderen
 */
export async function deleteExercise(exerciseId: number) {
  const { error } = await supabase
    .from("schemas_exercises")
    .delete()
    .eq("id", exerciseId);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return true;
}
