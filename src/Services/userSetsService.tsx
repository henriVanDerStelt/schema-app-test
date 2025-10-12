import { supabase } from "../supabaseClient";

/**
 * Voegt een nieuwe set toe aan de gebruiker
 * @param clerkUserId - het ID van de Clerk gebruiker
 * @param setId - het ID van de set die je wilt toevoegen
 */
export async function addUserSet(
  clerkUserId: string,
  setId: number,
  weightLifted: number
) {
  const { data, error } = await supabase
    .from("usersSets")
    .insert([
      {
        clerk_user_id: clerkUserId,
        set_id: setId,
        weight_lifted: weightLifted,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}

/**
 * Wijzigt een bestaande set van de gebruiker
 * @param userSetId - het ID van de entry in usersSets die je wilt aanpassen
 * @param newSetId - het nieuwe set ID dat je wilt instellen
 */
export async function updateUserSet(
  userSetId: number,
  newWeightLifted: number
) {
  const { data, error } = await supabase
    .from("usersSets")
    .update({ weight_lifted: newWeightLifted })
    .eq("id", userSetId)
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
}
