import { supabase } from "../supabaseClient";

/**
 * Voeg een nieuwe day toe aan een bestaand week
 * @param weekId - het ID van het week (foreign key)
 * @param dayNumber - het daynummer (bijv. 11)
 */
export async function addDay(weekId: number, dayNumber: number) {
  const { data, error } = await supabase
    .from("schemas_days")
    .insert([{ day: dayNumber, week: weekId }])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}

/**
 * Verwijdert een day uit de database op basis van ID.
 * @param dayId - Het ID van de day die je wilt verwijderen
 */
export async function deleteDay(dayId: number) {
  const { error } = await supabase
    .from("schemas_days")
    .delete()
    .eq("id", dayId);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return true;
}
