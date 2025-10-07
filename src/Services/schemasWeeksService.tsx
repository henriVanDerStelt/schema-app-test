import { supabase } from "../supabaseClient";

/**
 * Voeg een nieuwe week toe aan een bestaand schema
 * @param schemaId - het ID van het schema (foreign key)
 * @param weekNumber - het weeknummer (bijv. 11)
 */
export async function addWeek(schemaId: number, weekNumber: number) {
  const { data, error } = await supabase
    .from("schemas_weeks")
    .insert([{ week: weekNumber, schema: schemaId }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}

/**
 * Verwijdert een week uit de database op basis van ID.
 * @param weekId - Het ID van de week die je wilt verwijderen
 */
export async function deleteWeek(weekId: number) {
  const { error } = await supabase
    .from("schemas_weeks")
    .delete()
    .eq("id", weekId);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return true;
}
