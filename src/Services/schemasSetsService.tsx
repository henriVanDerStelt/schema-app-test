import { supabase } from "../supabaseClient";

/**
 * Voeg een nieuwe set toe aan een bestaand week
 * @param exerciseId - het ID van het week (foreign key)
 * @param setNumber - het setnummer (bijv. 11)
 */
export async function addSet(
  exerciseId: string,
  reps: number,
  weight: number,
  rpe: number
) {
  const { data, error } = await supabase
    .from("schemas_sets")
    .insert([{ reps: reps, weight: weight, rpe: rpe, exercise: exerciseId }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}

/**
 * Verwijdert een set uit de database op basis van ID.
 * @param setId - Het ID van de set die je wilt verwijderen
 */
export async function deleteSet(setId: number) {
  const { error } = await supabase
    .from("schemas_sets")
    .delete()
    .eq("id", setId);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return true;
}
